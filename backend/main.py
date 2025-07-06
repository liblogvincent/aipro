from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pdfplumber
import docx
import httpx
import os
from typing import List

app = FastAPI(title="Local File Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LLM_API_URL = os.getenv("LLM_API_URL", "https://api.deepseek.com/v1/analyze")
LLM_API_KEY = os.getenv("LLM_API_KEY", "your_deepseek_api_key")


def extract_text_from_docx(file):
    doc = docx.Document(file)
    return "\n".join([p.text for p in doc.paragraphs])

def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

@app.get("/")
async def root():
    return {"message": "Local File Analyzer API is running!"}

@app.post("/analyze/")
async def analyze_files(files: List[UploadFile] = File(...)):
    results = []
    for file in files:
        ext = file.filename.lower().split(".")[-1]
        if ext == "docx":
            content = extract_text_from_docx(file.file)
        elif ext == "pdf":
            content = extract_text_from_pdf(file.file)
        else:
            return JSONResponse(status_code=400, content={"error": "Unsupported file type"})
        # Call LLM API
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                LLM_API_URL,
                headers={"Authorization": f"Bearer {LLM_API_KEY}"},
                json={"text": content}
            )
            if resp.status_code == 200:
                analysis = resp.json()
            else:
                analysis = {"error": "LLM API error", "details": resp.text}
        results.append({"filename": file.filename, "analysis": analysis})
    return {"results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 