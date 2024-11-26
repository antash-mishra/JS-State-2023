# Backend Stage
ARG PYTHON_VERSION=3.12.0

# Backend Build Stage
FROM python:${PYTHON_VERSION}-slim AS backend-build

WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y python3-venv && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better cache utilization
COPY requirements.txt .

# Create and activate virtual environment
RUN python -m venv .venv
ENV PATH="/app/venv/bin:$PATH"

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application
COPY . .

EXPOSE 8000
# Backend runtime command
CMD ["uvicorn", "index:app", "--host", "0.0.0.0", "--port", "8080"]
