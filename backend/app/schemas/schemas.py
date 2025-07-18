from pydantic import BaseModel, EmailStr
from datetime import datetime
from enum import Enum
from typing import Optional

# 🎭 Role Enum
class RoleEnum(str, Enum):
    student = "student"
    teacher = "teacher"

# 👤 User Schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: RoleEnum

class TokenOut(BaseModel):
    access_token: str
    token_type: str

# 📚 Assignment Schemas
class AssignmentCreate(BaseModel):
    title: str
    description: str
    due_date: datetime

class AssignmentOut(BaseModel):
    id: int
    title: str
    description: str
    due_date: datetime
    created_by: int

    class Config:
        orm_mode = True

# 📄 Submission Schemas
class SubmissionOut(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    content: str
    file_url: Optional[str]
    submitted_at: datetime

    class Config:
        orm_mode = True
