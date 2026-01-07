import requests

def get_weather(location: str):
    api_key = "be2983c2f6b41d72fdf369282bc98540"

    try:
        result = requests.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={
                "q": location,
                "appid": api_key,
                "units": "metric"
            },
            timeout=5
        )

        data = result.json()

    except Exception as e:
        return {"error": "Weather service unavailable"}

    if result.status_code != 200:
        return {"error": "City not found"}

    return {
        "city": location.title(),
        "description": data["weather"][0]["description"],
        "feels_like": round(data["main"]["feels_like"]),
        "high": round(data["main"]["temp_max"]),
        "low": round(data["main"]["temp_min"])
    }
