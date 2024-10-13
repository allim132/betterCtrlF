from flask import Flask, jsonify, request
from flask_cors import CORS
import fitz  # PyMuPDF
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import io
import traceback
import json
import numpy as np

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NumpyEncoder, self).default(obj)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

STOP_WORDS = set(['the', 'and', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'of', 'is', 'are'])

def extract_text_from_pdf(pdf_file):
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    pages = [page.get_text() for page in doc]
    return pages

def preprocess_text(text):
    words = text.lower().split()
    return ' '.join([word for word in words if word not in STOP_WORDS])

def create_tfidf_index(pages):
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(pages)
    return vectorizer, tfidf_matrix

def find_relevant_pages(query, vectorizer, tfidf_matrix, pages, top_n=5):
    query_vec = vectorizer.transform([preprocess_text(query)])
    similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_indices = similarities.argsort()[-top_n:][::-1]
    return [(index, similarities[index]) for index in top_indices]

def highlight_matches(text, query):
    query_words = [word for word in query.lower().split() if word not in STOP_WORDS]
    highlighted_text = text
    for word in query_words:
        pattern = re.compile(r'\b' + re.escape(word) + r'\b', re.IGNORECASE)
        highlighted_text = pattern.sub(lambda m: f"**{m.group()}**", highlighted_text)
    return highlighted_text


@app.route('/api/search', methods=['POST'])
def search_pdf():
    try:
        file = request.files.get('file')
        query = request.form.get('query')
        
        if not file or not query:
            return jsonify({'error': 'Missing file or query'}), 400
        
        # Extract text from PDF
        pages = extract_text_from_pdf(file)
        
        # Preprocess pages
        preprocessed_pages = [preprocess_text(page) for page in pages]
        
        # Create TF-IDF index
        vectorizer, tfidf_matrix = create_tfidf_index(preprocessed_pages)
        
        # Find relevant pages
        top_matches = find_relevant_pages(query, vectorizer, tfidf_matrix, preprocessed_pages)
        
        # Prepare results
        results = []
        for index, similarity in top_matches:
            highlighted_content = highlight_matches(pages[index], query)
            results.append({
                'page_index': int(index),  # Convert to standard Python int
                'similarity_score': float(similarity),  # Convert to Python float
                'highlighted_content': highlighted_content
            })
        
        return json.dumps({'results': results}, cls=NumpyEncoder), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        print(f"Error in search_pdf: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': 'An internal error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)