from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import auth, assignments, submissions

# 🧱 Create database tables
Base.metadata.create_all(bind=engine)

# 🚀 Initialize FastAPI app
app = FastAPI(
    title="EdTech Assignment Tracker",
    description="API for managing assignments and submissions in an EdTech platform",
    version="1.0.0"
)

# 🌐 CORS settings (for frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔌 Register routers
app.include_router(auth.router)
app.include_router(assignments.router)
app.include_router(submissions.router)
