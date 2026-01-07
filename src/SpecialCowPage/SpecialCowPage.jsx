import './special.css'
import { useState, useEffect } from "react";

function SpecialCowImage() {
    const [cow, setCow] = useState({ x: 10, dir: 1 });

    useEffect(() => {
        let frameId;

        const step = () => {
            setCow(prev => {
                let nextX = prev.x + prev.dir * 0.2; // adjust speed
                let nextDir = prev.dir;

                // Bounce off edges
                if (nextX > 100 || nextX < 0) {
                    nextX = Math.max(0, Math.min(100, nextX));
                    nextDir = -prev.dir;
                }

                // Occasional random flip
                if (Math.random() < 0.01) nextDir = -nextDir;

                return { x: nextX, dir: nextDir };
            });

            frameId = requestAnimationFrame(step);
        };

        step();

        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <img
            src="src/SpecialCowPage/assets/special_cow.png"
            alt="cow with pink and purple spots"
            className="cow_image"
            style={{
                left: `${cow.x}%`,
                bottom: '5vh',
                transform: `scaleX(${cow.dir === 1 ? -1 : 1})`, // flipped to match image
                position: 'absolute',
            }}
        />
    );
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

function GreyClouds() {
    return (
        <>
            {Array.from({ length: 5 }, (_, i) => (
                <img 
                    key={i}
                    src="src/SpecialCowPage/assets/grey_cloud.png" 
                    className="grey_cloud"
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
            {Array.from({ length: 70 }, (_, i) => (
                <img
                    key={i}
                    src="src/SpecialCowPage/assets/rain.png"
                    className="rain"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 90}vh`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
        </>
    )
}

function Snow() {
    return (
        <>
            {Array.from({ length: 70 }, (_, i) => (
                <img
                    key={i}
                    src="src/SpecialCowPage/assets/snow.png"
                    className="snow"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 90}vh`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                        animationDelay: `${Math.random() * 5}s`
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
            {Array.from({ length: 70 }, (_, i) => (
                <img
                    key={i}
                    src="src/SpecialCowPage/assets/hail.png"
                    className="hail"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 90}vh`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                        animationDelay: `${Math.random() * 5}s`
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

function Thunder({ left }) {
    return (
        <img
            src="src/SpecialCowPage/assets/thunder.png"
            className="thunder"
            style={{ left }}
        />
    )
}

function Tornado({ from, keyProp }) {
    return (
        <img
            key={keyProp} 
            src="src/SpecialCowPage/assets/tornado.png"
            className={`tornado ${from}`}
        />
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

function HomeButton({ onClick }) {
    return (
        <img src="src/SpecialCowPage/assets/home.png" className="home_button" onClick={onClick}/>
    )
}

function SpecialCowPage({ setPageFunction }) {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showThunder, setShowThunder] = useState(false);
    const [thunderLeft, setThunderLeft] = useState("50%");

    const [showTornado, setShowTornado] = useState(false);
    const [tornadoFrom, setTornadoFrom] = useState("left");
    const [tornadoes, setTornadoes] = useState([]);

    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);

    const handleGetWeather = async () => {
        if (!city) return;

        setLoading(true);
        setWeather(null);

        try {
            const res = await fetch(
                `https://cowapi-vw4g.onrender.com/api/weather?city=${city}`
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

    useEffect(() => {
            if (!weather?.description?.includes("thunder")) return;

            let timeout;

            const triggerThunder = () => {
                setThunderLeft(`${Math.random() * 80 + 10}%`);
                setShowThunder(true);

                setTimeout(() => setShowThunder(false), 400);

                timeout = setTimeout(
                    triggerThunder,
                    1500 + Math.random() * 4000 
                );
            };

            triggerThunder();

            return () => clearTimeout(timeout);
        }, [weather]);

    useEffect(() => {
        if (!weather?.description?.includes("tornado")) return;

        const createTornado = () => {
            const from = Math.random() < 0.5 ? "left" : "right";
            const id = Date.now(); 
            setTornadoes(prev => [...prev, { from, id }]);

            setTimeout(() => {
                setTornadoes(prev => prev.filter(t => t.id !== id));
            }, 5000);
        }

        createTornado(); 
        const interval = setInterval(createTornado, 6000 + Math.random() * 4000); 

        return () => clearInterval(interval);
    }, [weather]);

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

            {!loading && (weather?.description?.includes("rain") || weather?.description?.includes("drizzle")) && (
                <>
                    <GreySky />
                    <Rain />
                    <GreyClouds />
                </>
            )}

            {!loading && weather?.description?.includes("snow") && (
                <>
                    <GreySky />
                    <Snow />
                    <WhiteClouds />
                </>
            )}

            {!loading && (weather?.description?.includes("hail") || weather?.description?.includes("sleet")) && (
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
            {!loading && (weather?.description?.includes("mist") || weather?.description?.includes("fog") || weather?.description?.includes("smoke")) && (
                <>
                    <Mist />
                </>
            )} 

            {!loading && weather?.description?.includes("thunder") && (
                <>
                    <GreySky />
                    {showThunder && <Thunder left={thunderLeft} />}
                    <GreyClouds />
                </>
            )}

            {!loading && weather?.description?.includes("tornado") && (
                <>
                    <GreySky />
                    {tornadoes.map(t => (
                        <Tornado key={t.id} keyProp={t.id} from={t.from} />
                    ))}
                </>
            )}

            <SpecialCowImage />
            <GreenGrass />

            <HomeButton onClick={() => setPageFunction("home")} />

        </div>  
    )
}

export default SpecialCowPage;