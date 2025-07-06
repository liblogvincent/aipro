# Local File Analyzer with LLM

This app lets you select DOCX or PDF files from your computer, analyzes them in batch using an LLM (e.g., DeepSeek), and displays the results.

## Features
- Select/upload DOCX or PDF files via web UI
- Backend extracts text from files
- Sends text in batch to LLM for analysis
- Displays analysis results in UI

## Stack
- Frontend: React
- Backend: FastAPI (Python)
- File Parsing: python-docx, pdfplumber
- LLM Integration: DeepSeek API (or similar)

## 🚀 Quick Start with GitHub Codespaces

### Step 1: Create a GitHub Repository
1. Create a new repository on GitHub
2. Push this code to your repository

### Step 2: Open in GitHub Codespaces
1. Go to your repository on GitHub
2. Click the green "Code" button
3. Select "Codespaces" tab
4. Click "Create codespace on main"
5. Wait for the environment to build (this may take 2-3 minutes)

### Step 3: Configure LLM API (Optional)
If you want to use a real LLM API, set environment variables:
```bash
export LLM_API_KEY="your_api_key_here"
export LLM_API_URL="https://api.deepseek.com/v1/analyze"
```

### Step 4: Start the Application
In the Codespace terminal, run:
```bash
./start-app.sh
```

This will:
- Start the FastAPI backend on port 8000
- Start the React frontend on port 3000
- Open both services in your browser

### Step 5: Access the Application
- Frontend: Click the "Open in Browser" button for port 3000
- Backend API: Click the "Open in Browser" button for port 8000
- API Documentation: Visit `http://localhost:8000/docs`

## 🔧 Manual Setup (Local Development)

### Backend Setup
1. `cd backend`
2. `python -m venv venv && source venv/bin/activate` (Linux/macOS) or `venv\Scripts\activate` (Windows)
3. `pip install -r requirements.txt`
4. `uvicorn main:app --reload`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm start`

## 📁 Project Structure
```
aipro/
├── .devcontainer/          # Codespaces configuration
│   ├── devcontainer.json   # Container setup
│   └── setup.sh           # Post-creation setup script
├── backend/               # FastAPI backend
│   ├── main.py           # Main API server
│   └── requirements.txt  # Python dependencies
├── frontend/             # React frontend
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   └── index.js      # React entry point
│   ├── public/
│   │   └── index.html    # HTML template
│   └── package.json      # Node.js dependencies
├── start-app.sh          # Startup script (created by setup)
├── README.md             # This file
└── .gitignore           # Git ignore rules
```

## 🔌 API Endpoints

- `GET /` - Health check
- `POST /analyze/` - Upload and analyze files

## 🛠️ Customization

### Using Different LLM APIs
Edit `backend/main.py` to use different LLM providers:
- OpenAI: Change API URL and authentication
- Anthropic: Update endpoint and headers
- Local LLM: Point to your local server

### Adding File Types
Extend the file parsing functions in `backend/main.py`:
- Add new extraction functions
- Update the file type checking logic

## 🐛 Troubleshooting

### Common Issues
1. **Port already in use**: Kill existing processes or change ports
2. **CORS errors**: Backend is configured to allow all origins
3. **File upload fails**: Check file size limits and supported formats
4. **LLM API errors**: Verify API key and endpoint configuration

### Debug Mode
- Backend: Add `--log-level debug` to uvicorn command
- Frontend: Check browser console for errors

---

**Note**: This is a demo application. For production use, add proper error handling, authentication, and security measures. 