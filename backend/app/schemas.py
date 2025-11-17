from pydantic import BaseModel, EmailStr
from datetime import datetime

from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str

    class Config:
        orm_mode = True

class DocumentCreate(BaseModel):
    filename: str
    department: Optional[str] = None

class DocumentOut(BaseModel):
    id: int
    filename: str
    department: Optional[str]
    predicted_department: Optional[str]
    is_misfiled: int
    summary: Optional[str]
    language: Optional[str]
    uploaded_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
