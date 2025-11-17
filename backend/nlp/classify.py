import pickle
from sentence_transformers import SentenceTransformer

with open('nlp_classifier.pkl', 'rb') as f:
    model, clf = pickle.load(f)

def classify(text):
    embedding = model.encode([text])
    proba = clf.predict_proba(embedding)[0]
    pred_index = proba.argmax()
    pred_label = clf.classes_[pred_index]
    confidence = proba[pred_index]
    return pred_label, confidence
