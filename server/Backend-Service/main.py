import os
import requests
import redis
import hashlib
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

# Read environment variables
REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")
ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:8000/predict")
CACHE_TIMEOUT = 60  # Cache timeout in seconds (1 minute)

# Initialize Redis client if the host and port are available
is_redis_client = False
redis_client = None
if REDIS_HOST and REDIS_PORT:
    try:
        redis_client = redis.Redis(host=REDIS_HOST, port=int(REDIS_PORT), db=0)
        # Test connection to Redis
        redis_client.ping()
        print("Connected to Redis")
        is_redis_client = True
    except redis.exceptions.ConnectionError:
        print("Redis unavailable, proceeding without cache")
    except Exception as e:
        print(f"Redis doesnt seem to be avaliable. \n Error {e}");

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    Income: int
    Age: int
    Experience: int
    CURRENT_JOB_YRS: int
    CURRENT_HOUSE_YRS: int
    Married_Single: str
    House_Ownership: str
    Car_Ownership: str
    Profession: str
    CITY: str
    STATE: str

def generate_cache_key(input_data: dict) -> str:
    """Generate a unique cache key based on the input data"""
    data_string = json.dumps(input_data, sort_keys=True)
    return hashlib.sha256(data_string.encode()).hexdigest()

def checkRedisConnection() -> bool:

    if REDIS_HOST and REDIS_PORT:
        try:
            check_redis_client = redis.Redis(host=REDIS_HOST, port=int(REDIS_PORT), db=0)
            check_redis_client.ping()
            return True
        except redis.exceptions.ConnectionError:
            print("Redis unavailable, proceeding without cache")
        except Exception as e:
            print(f"Redis doesnt seem to be avaliable. \n Error {e}");
    return False

@app.post("/predict")
async def predict(input_data: PredictionInput):
    input_data_dict = input_data.dict()
    cache_key = generate_cache_key(input_data_dict)
    
    # Try to fetch from Redis cache if available

    check_redis_client = checkRedisConnection();

    if check_redis_client:
        cached_result = redis_client.get(cache_key)
        if cached_result:
            print("Cache hit")
            return json.loads(cached_result)

    # Cache miss or Redis unavailable, so make a request to ML service
    try:
        response = requests.post(ML_SERVICE_URL, json=input_data_dict)
        response.raise_for_status()
        prediction_result = response.json()
        
        # If Redis is available, cache the result with a timeout
        if is_redis_client:
            redis_client.setex(cache_key, CACHE_TIMEOUT, json.dumps(prediction_result))
            print("Result cached with a 1-minute expiration")

        return prediction_result

    except requests.RequestException as e:
        print("Cant cache")
    except Exception as e:
        print(f"FUCKKK {e}")

@app.get("/env")
def get_env_variables():
    env_variables = dict(os.environ)
    return env_variables

@app.post("/onlyPredict")
async def predict(input_data: PredictionInput):
    input_data_dict = input_data.dict()
    response = requests.post(ML_SERVICE_URL, json=input_data_dict)
    response.raise_for_status()
    prediction_result = response.json()
    return prediction_result

# Optional: Create a root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Backend ML Proxy Service"}
