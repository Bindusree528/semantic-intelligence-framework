import fitz  # PyMuPDF

input_pdf = "uploaded_files/Engineering-malayalam.pdf"  # original large PDF path
output_pdf = "uploaded_files/Engineering-malayalam-sample.pdf"  # sample output path

doc = fitz.open(input_pdf)
new_doc = fitz.open()

num_pages_to_copy = min(3, doc.page_count)  # get 3 pages or less

for i in range(num_pages_to_copy):
    new_doc.insert_pdf(doc, from_page=i, to_page=i)

new_doc.save(output_pdf)
new_doc.close()
doc.close()

print(f"Sample PDF with {num_pages_to_copy} pages saved at {output_pdf}")
