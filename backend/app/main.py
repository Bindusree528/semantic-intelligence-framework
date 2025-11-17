from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy.orm import Session
import shutil
import os
from typing import List
import pytesseract
from PIL import Image
import fitz  # PyMuPDF
import pickle
from nlp.classify import classify
from sqlalchemy import Column, Float
from fastapi import HTTPException
from fastapi import HTTPException, Depends
from app.models import Document
from nlp.process_document import process_document  # your NLP module
from app.routes.auth_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles





from app.database import get_db, engine
from app.models import Base, Document, User
from app.auth import get_current_user, User as CurrentUser

app = FastAPI()
app.mount("/uploaded_files", StaticFiles(directory="uploaded_files"), name="uploaded_files")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "*",
    "http://localhost:3000",
    "https://semantic-intelligence-framework-q2gp517ez.vercel.app",
    "https://abc123.ngrok-free.app"
  ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)

# Create all tables if not exist
Base.metadata.create_all(bind=engine)

UPLOAD_DIR = "uploaded_files"


@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    department: str = Form(...),
    current_user: CurrentUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

    file_location = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    new_doc = Document(
        filename=file.filename,
        department=department,
        filepath=file_location,
        uploaded_by=current_user.id,
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)

    return JSONResponse(
        content={
            "id": new_doc.id,
            "filename": new_doc.filename,
            "department": new_doc.department,
            "filepath": new_doc.filepath,
        }
    )


@app.get("/documents", response_model=List[dict])
def list_documents(db: Session = Depends(get_db)):
    docs = db.query(Document).all()
    return [
        {
            "id": doc.id,
            "filename": doc.filename,
            "department": doc.department,
            "filepath": doc.filepath,
            "uploaded_by": doc.uploaded_by,
        }
        for doc in docs
    ]


@app.get("/documents/{document_id}/download")
def download_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return FileResponse(
        path=doc.filepath, filename=doc.filename, media_type="application/octet-stream"
    )


@app.get("/documents/{document_id}/ocr")
def ocr_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    if doc.filename.lower().endswith(".pdf"):
        text = ""
        pdf = fitz.open(doc.filepath)
        for page in pdf:
            text += page.get_text()
        return {"extracted_text": text}
    elif doc.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        image = Image.open(doc.filepath)
        text = pytesseract.image_to_string(image)
        return {"extracted_text": text}
    else:
        raise HTTPException(status_code=415, detail="Unsupported file format")


@app.get("/my/documents")
def list_my_documents(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    docs = db.query(Document).filter(Document.uploaded_by == current_user.id).all()
    return [
        {
            "id": doc.id,
            "filename": doc.filename,
            "department": doc.department,
            "filepath": doc.filepath,
        }
        for doc in docs
    ]


@app.get("/documents/{document_id}/preview")
def preview_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc or not doc.filepath:
        raise HTTPException(status_code=404, detail="Document not found")
    if doc.filename.lower().endswith(".pdf"):
        pdf = fitz.open(doc.filepath)
        page = pdf[0]
        text = page.get_text()
        preview_lines = "\n".join(text.splitlines()[:10])
        return {"preview": preview_lines}
    else:
        with open(doc.filepath, "r", encoding="utf-8", errors="ignore") as f:
            lines = [next(f) for _ in range(10)]
        return {"preview": "".join(lines)}


@app.get("/documents/search")
def search_documents(q: str, db: Session = Depends(get_db)):
    results = db.query(Document).filter(
        Document.filename.ilike(f"%{q}%") | Document.department.ilike(f"%{q}%")
    ).all()
    return [
        {
            "id": doc.id,
            "filename": doc.filename,
            "department": doc.department,
            "filepath": doc.filepath,
        }
        for doc in results
    ]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

@app.post("/classify/{document_id}", operation_id="classify_document_v1")
def classify_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(404, "Document not found")
    if not doc.filepath:
        raise HTTPException(400, "Document file path missing")

    text = None
    # Try to extract OCR text first from your existing method or run minimal extract
    # Simplify: read whole text content for now
    if doc.filepath.endswith(".pdf"):
        pdf = fitz.open(doc.filepath)
        text = "".join([page.get_text() for page in pdf])
    else:
        with open(doc.filepath, "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()

    predicted_department, confidence = classify(text)
    doc.predicted_department = predicted_department
    doc.confidence = confidence
    db.commit()
    return {"predicted_department": predicted_department, "confidence": confidence}

@app.post("/classify/{document_id}")
def classify_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    if not doc.filepath:
        raise HTTPException(status_code=400, detail="Document file path missing")

    text = ""
    try:
        if doc.filepath.lower().endswith(".pdf"):
            pdf = fitz.open(doc.filepath)
            for page in pdf:
                text += page.get_text()
        else:
            with open(doc.filepath, "r", encoding="utf-8", errors="ignore") as f:
                text = f.read()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading document: {e}")

    if not text.strip():
        raise HTTPException(status_code=400, detail="Document text is empty")

    predicted_dept, confidence = classify(text)

    # Misfile detection logic
    is_misfiled = (predicted_dept != doc.department and confidence > 0.75)
    flag_reason = f"Predicted {predicted_dept} with confidence {confidence}" if is_misfiled else None

    # Save to database
    doc.predicted_department = predicted_dept
    doc.confidence = confidence
    doc.is_misfiled = is_misfiled
    doc.flag_reason = flag_reason
    db.commit()

    return {
        "predicted_department": predicted_dept,
        "confidence": confidence,
        "is_misfiled": is_misfiled,
        "flag_reason": flag_reason,
    }

@app.post("/process_document/{doc_id}")
def process_document_endpoint(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    try:
        result = process_document(doc.filepath)
    except FileNotFoundError:
        raise HTTPException(status_code=400, detail="Document file not found on server")
    except Exception as e:
        # Log error here if logger is setup
        raise HTTPException(status_code=500, detail=f"Internal processing error: {str(e)}")

    return result
@app.post("/summarize/{document_id}")
def summarize_document(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    result = process_document(doc.filepath)
    summary = result.get("summary", "")

    # Save summary to DB (add column if not done)
    doc.summary = summary
    db.commit()

    return {"summary": summary}
@app.post("/translate/{document_id}")
def translate_document(document_id: int, target_lang: str = "en", db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    try:
        result = process_document(doc.filepath)
        translated_text = result.get("translated_tagged_text", "")
        # Optionally store or preview
        doc.translated_text = translated_text  # add to model if needed
        db.commit()
        return {"translated_text": translated_text}
    except FileNotFoundError:
        raise HTTPException(400, "File not found")
    except Exception as e:
        raise HTTPException(500, f"Processing error: {str(e)}")

@app.get("/documents", operation_id="list_documents_v1")
def list_documents(db: Session = Depends(get_db)):
    docs = db.query(Document).all()
    return [
        {
            "id": doc.id,
            "filename": doc.filename,
            "department": doc.department,
            "filepath": doc.filepath,
            "uploaded_by": doc.uploaded_by,
            "is_misfiled": doc.is_misfiled,
            "flag_reason": doc.flag_reason,
        }
        for doc in docs
    ]


@app.get("/alerts")
def get_alerts(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    flagged_docs = db.query(Document).filter(Document.is_misfiled == True).all()
    return [
        {
            "id": doc.id,
            "filename": doc.filename,
            "department": doc.department,
            "predicted_department": doc.predicted_department,
            "confidence": doc.confidence,
            "flag_reason": doc.flag_reason,
            "filepath": doc.filepath,
        }
        for doc in flagged_docs
    ]
