from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from weather import get_weather

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/weather")
def weather(city: str):
    return get_weather(city)
