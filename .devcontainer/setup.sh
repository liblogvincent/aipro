#!/bin/bash

# Install Python dependencies
echo "Installing Python dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
cd frontend
npm install
cd ..

# Create a startup script
cat > start-app.sh << 'EOF'
#!/bin/bash

# Start backend in background
echo "Starting FastAPI backend..."
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting React frontend..."
cd ../frontend
npm start

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
EOF

chmod +x start-app.sh

echo "Setup complete! Run './start-app.sh' to start both backend and frontend." 