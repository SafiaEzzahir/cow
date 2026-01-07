import './special.css'
import { useState } from "react";

function SpecialCowImage() {
    return (
        <img src="src/SpecialCowPage/assets/special_cow.png" alt="cow with pink and purple spots" className='cow_image'/>
    )
}

function GreenGrass() {
    return (
        <img src="src/SpecialCowPage/assets/green_grass.png" className="green_grass"/>
    )
}

function ClearSky() {
    return (
        <img src="src/SpecialCowPage/assets/blue_sky.png" className="clear_sky"/>
    )
}

function Sun() {
    return (
        <img src="src/SpecialCowPage/assets/sun.png" className='sun'/>
    )
}

function WhiteClouds() {
    return (
        <>
            {Array.from({ length: 5 }, (_, i) => (
                <img 
                    key={i}
                    src="src/SpecialCowPage/assets/white_cloud.png" 
                    className="white_cloud"
                    style={{ 
                        left: `${i * 20}%`, 
                        top: `${10 + (i % 3) * 8}vh` 
                    }}
                />
            ))}
        </>
    )
}

function Rain() {
    return (
        <>
            {Array.from({ length: 80}, (_, i) => (
                <img
                    key={i}
                    src="src/SpecialCowPage/assets/rain.png" 
                    className="rain"
                    style={{
                        left: `${Math.random() * 90}%`, 
                        bottom: `${Math.random() * 60}vh` 
                    }}
                />
            ))}
        </>
    )
}

function Snow() {
    return (
        <>
            {Array.from({ length: 50}, (_, i) => (
                <img
                    key={i}
                    src="src/SpecialCowPage/assets/snow.png" 
                    className="snow"
                    style={{
                        left: `${Math.random() * 90}%`, 
                        bottom: `${Math.random() * 60}vh` 
                    }}
                />
            ))}
        </>
    )
}

function GreySky () {
    return (
        <img src="src/SpecialCowPage/assets/grey_sky.png" className="grey_sky"/>
    )
}

function Hail() {
    return (
        <>
            {Array.from({ length: 80}, (_, i) => (
                <img
                    key={i}
                    src="src/SpecialCowPage/assets/hail.png" 
                    className="hail"
                    style={{
                        left: `${Math.random() * 90}%`, 
                        bottom: `${Math.random() * 60}vh` 
                    }}
                />
            ))}
        </>
    )
}

function Mist() {
    return (
        <img src="src/SpecialCowPage/assets/mist.png" className="mist"/>
    )
}
 
function Throbber() {
    return (
        <div className="throbber-container">
            <div className="throbber"></div>
            <p>Looking at the sky…</p>
        </div>
    )
}

function SpecialCowPage() {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGetWeather = async () => {
        if (!city) return;

        setLoading(true);
        setWeather(null);

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/weather?city=${city}`
            );
            const data = await res.json();
            setWeather(data);
        } catch (err) {
            console.error("Error fetching weather:", err);
            setWeather({ error: "Could not fetch weather" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

            <input 
                type='text' 
                placeholder='Enter city name' 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='input_city'
            />

            <button 
                onClick={handleGetWeather} 
                className='get_weather'
                disabled={loading}
            >
                {loading ? "Loading..." : "Get Weather"}
            </button>

            {loading && <Throbber />}

            {!loading && weather && !weather.error && (
                <p className='text'>
                    There is {weather.description} in {weather.city}.  
                    It feels like {weather.feels_like}°C  
                    (High {weather.high}°C / Low {weather.low}°C)
                </p>
            )}

            {weather?.error && <p className='text'>{weather.error}</p>}

            {!loading && weather?.description?.includes("cloud") && (
                <>
                    <ClearSky />
                    <WhiteClouds />
                </>
            )}

            {!loading && weather?.description?.includes("rain") && (
                <>
                    <GreySky />
                    <Rain />
                </>
            )}

            {!loading && weather?.description?.includes("snow") && (
                <>
                    <GreySky />
                    <Snow />
                </>
            )}

            {!loading && weather?.description?.includes("hail") && (
                <>
                    <GreySky />
                    <Hail />
                </>
            )}

            {!loading && weather?.description?.includes("clear") && (
                <>
                    <ClearSky />
                    <Sun />
                </>
            )}
            {!loading && (weather?.description?.includes("mist") || weather?.description?.includes("fog")) && (
                <>
                    <Mist />
                </>
            )} 

            <SpecialCowImage />
            <GreenGrass />

        </div>  
    )
}

export default SpecialCowPage;