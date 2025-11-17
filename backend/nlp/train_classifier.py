import pickle
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sentence_transformers import SentenceTransformer

# Load prepared data
with open('nlp/kmrl_training_data.pkl', 'rb') as f:
    data = pickle.load(f)

texts, labels = zip(*data)

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(texts)

X_train, X_test, y_train, y_test = train_test_split(embeddings, labels, test_size=0.2, random_state=42)

clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred, zero_division=0))

# Save model
with open('nlp_classifier.pkl', 'wb') as f:
    pickle.dump((model, clf), f)
