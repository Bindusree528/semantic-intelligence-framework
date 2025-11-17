import os
import fitz  # PyMuPDF
import pickle

BASE_DIR = 'kmrl_dataset1/dataset'

data = []
for dept in os.listdir(BASE_DIR):
    dept_path = os.path.join(BASE_DIR, dept)
    if not os.path.isdir(dept_path):
        continue
    for pdf_file in os.listdir(dept_path):
        if not pdf_file.lower().endswith('.pdf'):
            continue
        pdf_path = os.path.join(dept_path, pdf_file)
        try:
            pdf = fitz.open(pdf_path)
            text = ""
            for page in pdf:
                text += page.get_text()
            data.append((text[:2000], dept))
        except Exception as e:
            print(f"Error processing {pdf_path}: {e}")

with open('nlp/kmrl_training_data.pkl', 'wb') as f:
    pickle.dump(data, f)

print(f"Total samples prepared: {len(data)}")
