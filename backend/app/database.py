from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database URL
SQLITE_URL = "sqlite:///./dev.db"

# Create database engine
engine = create_engine(
    SQLITE_URL,
    connect_args={"check_same_thread": False}  # Required for SQLite to allow multi-threading
)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class for models to inherit from
Base = declarative_base()

# Dependency to get DB session for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
