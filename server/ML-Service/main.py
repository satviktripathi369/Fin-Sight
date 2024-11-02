from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
# Load the model
model = joblib.load("model_DTC.pkl")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input data model that the API expects
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


# Function to preprocess the input data (e.g., encoding categorical variables)
def preprocess_input(data: PredictionInput):
    # Example: Dummy encoding for categorical variables
    married_single_map = {"married": 1, "single": 0}
    house_ownership_map = {"owned": 1, "rented": 0, "norent_noown": -1}
    car_ownership_map = {"yes": 1, "no": 0}
    
    profession_map = {"Software_Developer": 1, "Doctor": 2, "Engineer": 3}  # You must adjust this map based on your dataset
    city_map = {"Mumbai": 1, "Delhi": 2, "Bangalore": 3}  # Example encoding for cities
    state_map = {"Maharashtra": 1, "Delhi": 2, "Karnataka": 3}  # Example encoding for states
    
    # Convert categorical variables to numeric
    married_single = married_single_map.get(data.Married_Single.lower(), 0)
    house_ownership = house_ownership_map.get(data.House_Ownership.lower(), 0)
    car_ownership = car_ownership_map.get(data.Car_Ownership.lower(), 0)
    profession = profession_map.get(data.Profession, 0)
    city = city_map.get(data.CITY, 0)
    state = state_map.get(data.STATE, 0)

    # Combine all features into a single array
    return np.array([[data.Income,
                      data.Age,
                      data.Experience,
                      data.CURRENT_JOB_YRS,
                      data.CURRENT_HOUSE_YRS,
                      married_single,
                      house_ownership,
                      car_ownership,
                      profession,
                      city,
                      state]])


@app.post("/predict")
async def predict(input_data: PredictionInput):
    try:
        # Preprocess input data
        input_features = preprocess_input(input_data)

        # Predict using the loaded model
        prediction = model.predict(input_features)

        # Convert the prediction result into a readable format
        prediction_result = "YES" if prediction[0] == 1 else "NO"

        return {"prediction": prediction_result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"An error occurred: {str(e)}")


# Optional: Create a root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the ML API!"}
