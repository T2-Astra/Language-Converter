# 🔄 AI Code Language Converter

A sleek, modern, and open-source web application for converting code between hundreds of programming languages using AI. Built with **Vanilla HTML/JS**, **Tailwind CSS**, and **Shadcn UI** aesthetics.

![Language Converter Preview](https://github.com/T2-Astra/Language-Converter/raw/main/preview.png)

## ✨ Features

- 🚀 **Instant Conversion**: Seamlessly translate code between any programming language.
- 🔍 **Searchable Languages**: Smart combobox with live search support for 100+ languages.
- 🎨 **Shadcn UI Design**: Beautiful, minimal, and professional interface with Figtree typography.
- ⚡ **Real-time Feedback**: Premium shimmer animations during the conversion process.
- 📱 **Fully Responsive**: Works perfectly on mobile, tablet, and desktop.

## 🔑 API Configuration

This project is open-source and uses the **KeyMorph API** to handle the heavy lifting of code translation. 

### How to get an API Key:
To use this project locally or deploy it yourself, you will need your own KeyMorph API key:
1. Visit [KeyMorph](https://keymorph.zeabur.app/) (or your preferred AI endpoint provider).
2. Generate your unique API Key.
3. Open `index.html` in your text editor.
4. Locate the following line (around line 360-370):
   ```javascript
   const response = await fetch('https://keymorph.zeabur.app/v1/YOUR_API_ID', {
   ```
5. Replace `YOUR_API_ID` (or the existing endpoint) with your own API endpoint/key ID.

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/T2-Astra/Language-Converter.git
   ```
2. **Open the project:**
   Simply open `index.html` in any modern web browser. No complex installation or server setup is required!

## 🛠️ Built With

- **HTML5/ES6+ Javascript**
- **Tailwind CSS** (via CDN)
- **Figtree Font** (Google Fonts)
- **Lucide Icons**
- **KeyMorph API**

## 📄 License

This project is open-source and available under the MIT License. Feel free to fork, modify, and use it for your own projects!

---
Developed by [T2-Astra](https://github.com/T2-Astra) 🚀
