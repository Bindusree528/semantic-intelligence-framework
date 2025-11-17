from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Document

db: Session = SessionLocal()
docs = db.query(Document).all()
for doc in docs:
    print(f"ID: {doc.id} | Filename: {doc.filename} | Filepath: {doc.filepath}")
db.close()
