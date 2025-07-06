import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use environment variable or default to localhost for Codespaces
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    
    try {
      const response = await axios.post(`${BACKEND_URL}/analyze/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(response.data.results);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Error analyzing files. Please check if the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'Arial', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Local File Analyzer</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        Upload DOCX or PDF files to analyze them using an LLM
      </p>
      
      <div style={{ 
        border: '2px dashed #ccc', 
        borderRadius: '8px', 
        padding: '40px', 
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".docx,.pdf"
            multiple
            onChange={handleFileChange}
            style={{ marginBottom: '20px' }}
          />
          <br />
          <button 
            type="submit" 
            disabled={loading || files.length === 0}
            style={{ 
              padding: '12px 24px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {loading ? 'Analyzing...' : `Analyze ${files.length} file${files.length !== 1 ? 's' : ''}`}
          </button>
        </form>
      </div>

      {error && (
        <div style={{ 
          color: 'white', 
          backgroundColor: '#dc3545', 
          padding: '15px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h3>Analysis Results:</h3>
          {results.map((res, idx) => (
            <div key={idx} style={{ 
              marginBottom: '20px', 
              padding: '20px', 
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4 style={{ marginTop: 0, color: '#333' }}>{res.filename}</h4>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                overflow: 'auto',
                maxHeight: '400px'
              }}>
                {JSON.stringify(res.analysis, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App; 