from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Base, Document
import os

Base.metadata.create_all(bind=engine)

def seed_documents():
    db: Session = SessionLocal()
    # Clear table
    db.query(Document).delete()
    db.commit()

    documents = [
        Document(
            filename="example.pdf",
            department="finance",
            filepath=os.path.abspath("uploaded_files/example.pdf"),
            uploaded_by=1  # make sure user with id=1 exists
        ),
        # Add other sample documents here
    ]

    for doc in documents:
        db.add(doc)

    db.commit()
    db.close()
    print("Seeded documents successfully.")

if __name__ == "__main__":
    seed_documents()
