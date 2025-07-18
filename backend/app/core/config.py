from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # App settings
    app_name: str = "EdTech Assignment Tracker"
    debug: bool = True

    # Database settings
    database_url: str = "sqlite:///./assignment_tracker.db"  # Use PostgreSQL in production

    # JWT settings
    secret_key: str = "your-secret-key"  # Replace with a secure key in production
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60  # Token validity in minutes

    # File upload settings (optional)
    upload_dir: str = "./uploads"

    class Config:
        env_file = ".env"  # Load variables from .env file

# Instantiate settings
settings = Settings()
