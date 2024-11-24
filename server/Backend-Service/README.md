python -m venv venv

venv\Scripts\activate
OR
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --host 0.0.0.0 --port 8001 --reload

docker build -t backend .

docker run -d --name redis --network finsight -p 6379:6379 redis 

docker run -p 8001:8001 \                                        
  --name backend --network finsight \
  -e REDIS_HOST=redis \
  -e REDIS_PORT=6379 \
  -e ML_SERVICE_URL=http://ml:8000/predict \
  -e CACHE_TIMEOUT=60 \
  backend