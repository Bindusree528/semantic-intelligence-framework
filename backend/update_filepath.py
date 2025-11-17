import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'app')))
from database import SessionLocal
from models import Document
from sqlalchemy.orm import Session




def update_filepath(doc_id, new_path):
    db: Session = SessionLocal()
    try:
        doc = db.query(Document).filter(Document.id == doc_id).first()
        if doc:
            doc.filepath = new_path
            db.commit()
            print(f"Updated document ID {doc_id} filepath to {new_path}")
        else:
            print(f"Document ID {doc_id} not found")
    finally:
        db.close()

if __name__ == "__main__":
    doc_id_to_update = 2  # Change this to your document ID
    new_file_path = "uploaded_files/Engineering-malayalam-sample.pdf"
    update_filepath(doc_id_to_update, new_file_path)
