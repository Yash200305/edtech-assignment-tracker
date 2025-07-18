from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.models import Assignment, Submission, User
from app.schemas.schemas import AssignmentCreate, AssignmentOut, SubmissionOut
from app.core.security import get_current_user

router = APIRouter(prefix="/assignments", tags=["Assignments"])

# 🧑‍🏫 Create assignment (teacher only)
@router.post("/", response_model=AssignmentOut)
def create_assignment(
    assignment: AssignmentCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "teacher":
        raise HTTPException(status_code=403, detail="Only teachers can create assignments")

    new_assignment = Assignment(
        title=assignment.title,
        description=assignment.description,
        due_date=assignment.due_date,
        created_by=current_user["user_id"]
    )
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment

# 📄 View submissions for an assignment (teacher only)
@router.get("/{assignment_id}/submissions/", response_model=List[SubmissionOut])
def view_submissions(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    assignment = db.query(Assignment).filter_by(id=assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    if assignment.created_by != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="You can only view submissions for your own assignments")

    submissions = db.query(Submission).filter_by(assignment_id=assignment_id).all()
    return submissions
