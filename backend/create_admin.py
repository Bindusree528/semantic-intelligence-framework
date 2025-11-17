from app.database import SessionLocal
from app.models import User
from app.auth import get_password_hash

def create_admin_user():
    db = SessionLocal()
    existing = db.query(User).filter(User.email == "admin").first()
    if existing:
        print("Admin user already exists.")
        return
    user = User(
        email="admin",
        hashed_password=get_password_hash("admin123"),
        role="admin",
    )
    db.add(user)
    db.commit()
    db.close()
    print("Admin user created successfully.")

if __name__ == "__main__":
    create_admin_user()
