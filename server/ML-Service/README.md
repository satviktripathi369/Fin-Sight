python -m venv venv

venv\Scripts\activate
OR
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --host 0.0.0.0 --port 8000 --reload

docker build -t ml .

docker run -d -p 8000:8000 --name ml --network finsight ml
