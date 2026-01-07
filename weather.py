import requests
def get_weather(location):
    api_key = "be2983c2f6b41d72fdf369282bc98540"
    while True:
        result = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric")
        if result.json()["cod"] == "404":
            print("City not found. Please try again.")
        break
    description = result.json()["weather"][0]["description"]
    feels_like = round(result.json()["main"]["feels_like"])
    high_temp = round(result.json()["main"]["temp_max"])
    low_temp = round(result.json()["main"]["temp_min"])
    print(f"There is {description} in {location[0].upper()}{location[1:]}. It feels like {feels_like}°C with a high of {high_temp}°C and a low of {low_temp}°C.")