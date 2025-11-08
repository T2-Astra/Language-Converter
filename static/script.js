// Flask Backend Configuration
const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
// DOM Elements
const inputCode = document.getElementById('inputCode');
const outputCode = document.getElementById('outputCode');
const targetLanguage = document.getElementById('targetLanguage');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');
const inputLanguage = document.getElementById('inputLanguage');

// Language mappings for file extensions
const languageExtensions = {
    javascript: 'js',
    python: 'py',
    java: 'java',
    cpp: 'cpp',
    csharp: 'cs',
    go: 'go',
    rust: 'rs',
    php: 'php',
    ruby: 'rb',
    typescript: 'ts',
    kotlin: 'kt',
    swift: 'swift'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    detectInputLanguage();
});

// Event Listeners
function setupEventListeners() {
    convertBtn.addEventListener('click', convertCode);
    copyBtn.addEventListener('click', copyToClipboard);
    downloadBtn.addEventListener('click', downloadCode);
    inputCode.addEventListener('input', detectInputLanguage);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'Enter') {
                e.preventDefault();
                convertCode();
            } else if (e.key === 'k') {
                e.preventDefault();
                inputCode.focus();
            }
        }
    });
}

// Language Detection
function detectInputLanguage() {
    const code = inputCode.value.trim();
    if (!code) {
        inputLanguage.textContent = 'Paste code to detect';
        return;
    }
    
    const detectedLang = detectLanguage(code);
    inputLanguage.textContent = detectedLang;
}

function detectLanguage(code) {
    // Simple language detection based on syntax patterns
    if (code.includes('def ') || code.includes('import ') || code.includes('print(')) {
        return 'Python';
    } else if (code.includes('function ') || code.includes('const ') || code.includes('console.log')) {
        return 'JavaScript';
    } else if (code.includes('public class ') || code.includes('System.out.println')) {
        return 'Java';
    } else if (code.includes('#include') || code.includes('std::')) {
        return 'C++';
    } else if (code.includes('using System') || code.includes('Console.WriteLine')) {
        return 'C#';
    } else if (code.includes('func ') || code.includes('package main')) {
        return 'Go';
    } else if (code.includes('fn ') || code.includes('println!')) {
        return 'Rust';
    } else if (code.includes('<?php') || code.includes('echo ')) {
        return 'PHP';
    } else if (code.includes('puts ') || code.includes('def ')) {
        return 'Ruby';
    }
    
    return 'Unknown';
}

// Code Conversion
async function convertCode() {
    const code = inputCode.value.trim();
    const target = targetLanguage.value;
    
    if (!code) {
        alert('Please enter some code to convert!');
        return;
    }
    
    setLoading(true);
    
    try {
        const response = await fetch(`${BACKEND_URL}/convert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                language: getLanguageName(target)
            })
        });
        
        if (!response.ok) {
            throw new Error(`Backend request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            displayConvertedCode(data.converted_code, target);
        } else {
            throw new Error(data.error || 'Conversion failed');
        }
        
    } catch (error) {
        console.error('Conversion error:', error);
        alert('Conversion failed. Please try again.');
        outputCode.textContent = 'Error: Could not convert code. Please check if the Flask server is running and try again.';
    } finally {
        setLoading(false);
    }
}

function displayConvertedCode(code, language) {
    // Clean up the code (remove markdown formatting if present)
    let cleanCode = code.replace(/```[\w]*\n?/g, '').trim();
    
    // Create a code element with syntax highlighting
    const codeElement = document.createElement('code');
    codeElement.className = `language-${language}`;
    codeElement.textContent = cleanCode;
    
    outputCode.innerHTML = '';
    outputCode.appendChild(codeElement);
    
    // Apply syntax highlighting if Prism is available
    if (window.Prism) {
        Prism.highlightElement(codeElement);
    }
}

function getLanguageName(langCode) {
    const names = {
        javascript: 'JavaScript',
        python: 'Python',
        java: 'Java',
        cpp: 'C++',
        csharp: 'C#',
        go: 'Go',
        rust: 'Rust',
        php: 'PHP',
        ruby: 'Ruby',
        typescript: 'TypeScript',
        kotlin: 'Kotlin',
        swift: 'Swift'
    };
    return names[langCode] || langCode;
}

// Utility Functions
function setLoading(isLoading) {
    if (isLoading) {
        convertBtn.style.display = 'none';
        loading.style.display = 'flex';
    } else {
        convertBtn.style.display = 'flex';
        loading.style.display = 'none';
    }
}

async function copyToClipboard() {
    const code = outputCode.textContent;
    
    if (!code || code.includes('Your converted code will appear here')) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(code);
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function downloadCode() {
    const code = outputCode.textContent;
    const language = targetLanguage.value;
    
    if (!code || code.includes('Your converted code will appear here')) {
        return;
    }
    
    const extension = languageExtensions[language] || 'txt';
    const filename = `converted_code.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Add some helpful keyboard shortcuts info
document.addEventListener('DOMContentLoaded', function() {
    // Add tooltip or help text for keyboard shortcuts
    convertBtn.title = 'Convert Code (Ctrl/Cmd + Enter)';
    inputCode.title = 'Focus input (Ctrl/Cmd + K)';
});
