from nlp.process_document import process_document

def test_pipeline(filepath):
    print(f"Testing document: {filepath}")
    try:
        result = process_document(filepath)
        print("Result:")
        for k, v in result.items():
            print(f"{k}:")
            print(v)
            print()
    except Exception as e:
        print(f"Error during pipeline processing: {e}")

if __name__ == "__main__":
    # Path to a test document PDF that you have locally
    test_filepath = "backend/uploaded_files/KMRL_Finance_Report_Sample.pdf"
    test_pipeline(test_filepath)
