from app.database import engine
from app.models import Base

# Drop all tables (not needed if DB deleted, but safe)
Base.metadata.drop_all(bind=engine)

# Create tables based on current models
Base.metadata.create_all(bind=engine)

print("Database schema reset completed.")
