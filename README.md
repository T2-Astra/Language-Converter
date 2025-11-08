# Code Language Converter

A beautiful web application that converts code between different programming languages using Google Gemini AI.

## Features

- 🔄 Convert code between 12+ programming languages
- 🎨 Beautiful Aurora gradient background
- 🌙 Dark mode interface
- ⚡ Real-time language detection
- 📋 Copy and download converted code
- 🚀 Powered by Google Gemini AI

## Supported Languages

JavaScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby, TypeScript, Kotlin, Swift

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your Gemini API key:
   ```bash
   export GEMINI_API_KEY=your_api_key_here
   ```

4. Run the application:
   ```bash
   python converter.py
   ```

5. Open http://localhost:5000 in your browser

## Deployment on Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Render will auto-detect the `render.yaml` file
6. Add your `GEMINI_API_KEY` in the Environment Variables section
7. Click "Create Web Service"

## Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (required)

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **AI**: Google Gemini 2.5 Flash
- **Styling**: Custom CSS with Aurora animations

## License

MIT
