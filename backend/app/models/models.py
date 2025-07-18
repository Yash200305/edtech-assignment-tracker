from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from app.database import Base
import enum

class RoleEnum(enum.Enum):
    student = "student"
    teacher = "teacher"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    password_hash = Column(String)
    role = Column(Enum(RoleEnum))

class Assignment(Base):
    __tablename__ = "assignments"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(Text)
    due_date = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))

class Submission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, primary_key=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    file_url = Column(String, nullable=True)
