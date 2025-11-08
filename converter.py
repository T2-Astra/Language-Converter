from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Gemini API
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables")
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    """Serve the main HTML page"""
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_code():
    """API endpoint to convert code between languages"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        input_code = data.get('code', '').strip()
        target_language = data.get('language', '')
        
        if not input_code:
            return jsonify({'error': 'No code provided'}), 400
        
        if not target_language:
            return jsonify({'error': 'No target language specified'}), 400
        
        # Create prompt for Gemini
        prompt = f"Convert this code to {target_language}. Only return the converted code without explanations or markdown formatting:\n\n{input_code}"
        
        # Generate response using Gemini
        response = model.generate_content(prompt)
        converted_code = response.text
        
        # Clean up the response (remove any markdown formatting)
        converted_code = converted_code.replace('```', '').strip()
        # Remove language identifiers that might be at the start
        lines = converted_code.split('\n')
        if lines and lines[0].lower() in ['javascript', 'python', 'java', 'cpp', 'c++', 'csharp', 'c#', 'go', 'rust', 'php', 'ruby', 'typescript', 'kotlin', 'swift']:
            converted_code = '\n'.join(lines[1:]).strip()
        
        return jsonify({
            'success': True,
            'converted_code': converted_code,
            'target_language': target_language
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Conversion failed: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Code Converter API is running'})

if __name__ == "__main__":
    # Create templates directory if it doesn't exist
    os.makedirs('templates', exist_ok=True)
    
    # Run the Flask app 
    app.run(debug=True, host='0.0.0.0', port=5000)
