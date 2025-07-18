from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from datetime import datetime
import os
from typing import Optional

from app.database import get_db
from app.models.models import Assignment, Submission
from app.core.security import get_current_user
from app.core.config import settings

router = APIRouter(tags=["Submissions"])

# 📤 Submit assignment (student only)
@router.post("/assignments/{assignment_id}/submit/")
def submit_assignment(
    assignment_id: int,
    content: str = Form(...),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "student":
        raise HTTPException(status_code=403, detail="Only students can submit assignments")

    assignment = db.query(Assignment).filter_by(id=assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    # 🗂️ Handle file upload
    file_url = None
    if file:
        upload_dir = settings.upload_dir
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, f"{current_user['user_id']}_{assignment_id}_{file.filename}")
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        file_url = file_path

    # 📝 Save submission
    submission = Submission(
        assignment_id=assignment_id,
        student_id=current_user["user_id"],
        content=content,
        file_url=file_url,
        submitted_at=datetime.utcnow()
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)

    return {"message": "Submission successful", "submission_id": submission.id}
