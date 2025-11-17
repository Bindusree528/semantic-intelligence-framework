from sqlalchemy import Column, String, Integer, DateTime, Text, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime
from sqlalchemy import Float
Base = declarative_base()
from sqlalchemy import Column, Boolean, Text
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # e.g., admin, hr, finance, engineering

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    department = Column(String, nullable=True)
    predicted_department = Column(String, nullable=True)
    
    summary = Column(Text, nullable=True)
    language = Column(String, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    filepath = Column(String, nullable=False)  # storing path of uploaded file
    uploaded_by = Column(Integer, ForeignKey("users.id"))  # uploader user reference
    uploaded_user = relationship("User", foreign_keys=[uploaded_by])
    confidence = Column(Float, nullable=True)
    is_misfiled = Column(Boolean, default=False)

    flag_reason = Column(Text, nullable=True)