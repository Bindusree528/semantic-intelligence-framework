import re
import os
from transformers import pipeline, AutoTokenizer
import fitz  # PyMuPDF

# Load pipelines and tokenizer once globally
summarizer = pipeline("summarization")
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-ml-en")
tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")

# Malayalam Unicode block regex
malayalam_re = re.compile(r'[\u0D00-\u0D7F]+')

def extract_text(filepath):
    if not os.path.isfile(filepath):
        raise FileNotFoundError(f"No such file: '{filepath}'")
    pdf = fitz.open(filepath)
    text = ""
    for page in pdf:
        text += page.get_text()
    return text

def chunk_text(text, max_tokens=1000):
    words = text.split()
    chunks = []
    cur_chunk = []
    cur_length = 0
    for word in words:
        token_len = len(tokenizer.tokenize(word))
        if cur_length + token_len > max_tokens:
            chunks.append(' '.join(cur_chunk))
            cur_chunk = [word]
            cur_length = token_len
        else:
            cur_chunk.append(word)
            cur_length += token_len
    if cur_chunk:
        chunks.append(' '.join(cur_chunk))
    return chunks

def translate_malayalam_blocks(text):
    # Surround entire Malayalam blocks with [translate:...]
    def tag_block(match):
        return f"[translate:{match.group(0)}]"
    # Find whole contiguous Malayalam blocks only and tag
    return malayalam_re.sub(tag_block, text)

def process_document(filepath):
    text = extract_text(filepath)
    chunks = chunk_text(text, max_tokens=200)
    summaries = []
    translated_tagged_chunks = []

    for chunk in chunks:
        print(f"Processing chunk with {len(tokenizer.tokenize(chunk))} tokens")

        # Translate Malayalam blocks to English within chunk
        translated_chunk = translate_malayalam_blocks(chunk)
        # Replace tags with translated text for summarization, but keep tags for display
        english_chunk = malayalam_re.sub(lambda m: translator(m.group())[0]['translation_text'], chunk)
        
        # Summarize English text, truncate inputs if necessary
        tokens = tokenizer.tokenize(english_chunk)
        if len(tokens) > 1024:
            english_chunk = tokenizer.convert_tokens_to_string(tokens[:1024])

        summary = summarizer(
            english_chunk,
            max_length=40,
            min_length=10,
            do_sample=False,
            truncation=True
        )[0]['summary_text']



        summaries.append(summary)
        translated_tagged_chunks.append(translated_chunk)

    return {
        "translated_tagged_text": " ".join(translated_tagged_chunks),
        "summary": " ".join(summaries)
    }
