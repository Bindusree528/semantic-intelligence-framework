import sys
print("Python executable:", sys.executable)
print("sys.path:")
for p in sys.path:
    print(p)

try:
    from jose import jwt, JWTError
    print("python-jose imported successfully!")
except ImportError:
    print("Failed to import python-jose")
