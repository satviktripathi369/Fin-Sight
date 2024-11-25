# Use the official Python image as a base
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application to the working directory
COPY . .

# Set default environment variables
ENV REDIS_HOST=127.0.0.1
ENV REDIS_PORT=6379
ENV ML_SERVICE_URL=http://localhost:8000/predict
ENV CACHE_TIMEOUT=60


# Expose the port the app runs on
EXPOSE 8001

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
