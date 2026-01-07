import './special.css'
import { useState, useEffect } from "react";

function SpecialCowImage({ sad }) {
    const [cow, setCow] = useState({ x: 10, dir: 1 });
    const [jumping, setJumping] = useState(false);

    useEffect(() => {
        let frameId;

        const step = () => {
            setCow(prev => {
                const speed = sad ? 0.1 : 0.2;
                let nextX = prev.x + prev.dir * speed;
                let nextDir = prev.dir;

                if (nextX > 100 || nextX < 0) {
                    nextX = Math.max(0, Math.min(100, nextX));
                    nextDir = -prev.dir;
                }

                if (Math.random() < 0.01) nextDir = -nextDir;

                return { x: nextX, dir: nextDir };
            });

            frameId = requestAnimationFrame(step);
        };

        step();
        return () => cancelAnimationFrame(frameId);
    }, [sad]);

    const handleJump = () => {
        if (jumping) return;
        setJumping(true);
        setTimeout(() => setJumping(false), 400);
    };

    const cowImage = sad
        ? "src/SpecialCowPage/assets/sad_cow.png"
        : "src/SpecialCowPage/assets/special_cow.png";

    return (
        <img
            src={cowImage}
            alt="cow"
            className={`cow_image ${jumping ? "jump" : ""} ${sad ? "sad" : ""}`}
            onClick={handleJump}
            style={{
                left: `${cow.x}%`,
                transform: `scaleX(${cow.dir === 1 ? -1 : 1})`,
                position: "absolute",
            }}
        />
    );
}

const GreenGrass = () => (
    <img src="src/SpecialCowPage/assets/green_grass.png" className="green_grass" />
);

const ClearSky = () => (
    <img src="src/SpecialCowPage/assets/blue_sky.png" className="clear_sky" />
);

const GreySky = () => (
    <img src="src/SpecialCowPage/assets/grey_sky.png" className="grey_sky" />
);

const Sun = () => (
    <img src="src/SpecialCowPage/assets/sun.png" className="sun" />
);

const Mist = () => (
    <img src="src/SpecialCowPage/assets/mist.png" className="mist" />
);

function WhiteClouds() {
    return (
        <>
            {Array.from({ length: 5 }, (_, i) => (
                <img
                    key={i}
                    src="src/SpecialCowPage/assets/white_cloud.png"
                    className="white_cloud"
                    style={{ left: `${i * 20}%`, top: `${10 + (i % 3) * 8}vh` }}
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
                    style={{ left: `${i * 20}%`, top: `${10 + (i % 3) * 8}vh` }}
                />
            ))}
        </>
    )
}

function Rain({ src, className }) {
    return (
        <>
            {Array.from({ length: 70 }, (_, i) => (
                <img
                    key={i}
                    src={src}
                    className={className}
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

function Thunder({ left }) {
    return (
        <img
            src="src/SpecialCowPage/assets/thunder.png"
            className="thunder"
            style={{ left }}
        />
    )
}

function Tornado({ from }) {
    return (
        <img
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

const HomeButton = ({ onClick }) => (
    <img
        src="src/SpecialCowPage/assets/home.png"
        className="home_button"
        onClick={onClick}
    />
);

function SpecialCowPage({ setPageFunction }) {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showThunder, setShowThunder] = useState(false);
    const [thunderLeft, setThunderLeft] = useState("50%");
    const [tornadoes, setTornadoes] = useState([]);

    const handleGetWeather = async () => {
        if (!city) return;

        setLoading(true);
        setWeather(null);

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/weather?city=${city}`);
            const data = await res.json();
            setWeather(data);
        } catch {
            setWeather({ error: "Could not fetch weather" });
        } finally {
            setLoading(false);
        }
    };

    const sadWeather =
        weather?.description &&
        (
            weather.description.includes("rain") ||
            weather.description.includes("drizzle") ||
            weather.description.includes("thunder") ||
            weather.description.includes("snow") ||
            weather.description.includes("hail") ||
            weather.description.includes("sleet") ||
            weather.description.includes("tornado") ||
            weather.description.includes("mist") ||
            weather.description.includes("fog") ||
            weather.description.includes("haze") ||
            weather.description.includes("smoke")
        );

    useEffect(() => {
        if (!weather?.description?.includes("thunder")) return;

        let timeout;

        const trigger = () => {
            setThunderLeft(`${Math.random() * 80 + 10}%`);
            setShowThunder(true);
            setTimeout(() => setShowThunder(false), 400);
            timeout = setTimeout(trigger, 2000 + Math.random() * 3000);
        };

        trigger();
        return () => clearTimeout(timeout);
    }, [weather]);

    useEffect(() => {
        if (!weather?.description?.includes("tornado")) return;

        const spawn = () => {
            const id = Date.now();
            const from = Math.random() < 0.5 ? "left" : "right";
            setTornadoes(prev => [...prev, { id, from }]);
            setTimeout(() => {
                setTornadoes(prev => prev.filter(t => t.id !== id));
            }, 5000);
        };

        spawn();
        const interval = setInterval(spawn, 7000);
        return () => clearInterval(interval);
    }, [weather]);

    return (
        <div>

            <input
                className="input_city"
                placeholder="Enter city name"
                value={city}
                onChange={e => setCity(e.target.value)}
            />

            <button
                className="get_weather"
                onClick={handleGetWeather}
                disabled={loading}
            >
                {loading ? "Loading..." : "Get Weather"}
            </button>

            {loading && <Throbber />}

            {!loading && weather?.error && (
                <p className="text error">{weather.error}</p>
            )}

            {!loading && weather && !weather.error && (
                <p className="text">
                    There is {weather.description} in {weather.city}.
                    It feels like {weather.feels_like}°C
                    (High {weather.high}°C / Low {weather.low}°C)
                </p>
            )}


            {!loading && weather?.description?.includes("clear") && (
                <>
                    <ClearSky />
                    <Sun />
                </>
            )}

            {!loading && weather?.description?.includes("cloud") && (
                <>
                    <ClearSky />
                    <WhiteClouds />
                </>
            )}

            {!loading && (weather?.description?.includes("rain") || weather?.description?.includes("drizzle")) && (
                <>
                    <GreySky />
                    <Rain src="src/SpecialCowPage/assets/rain.png" className="rain" />
                    <GreyClouds />
                </>
            )}

            {!loading && weather?.description?.includes("snow") && (
                <>
                    <GreySky />
                    <Rain src="src/SpecialCowPage/assets/snow.png" className="snow" />
                </>
            )}

            {!loading && (weather?.description?.includes("hail") || weather?.description?.includes("sleet")) && (
                <>
                    <GreySky />
                    <Rain src="src/SpecialCowPage/assets/hail.png" className="hail" />
                </>
            )}

            {!loading && (weather?.description?.includes("mist") || weather?.description?.includes("fog") || weather?.description?.includes("smoke") || weather?.description?.includes("haze")) && (
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
                        <Tornado key={t.id} from={t.from} />
                    ))}
                </>
            )}

            <SpecialCowImage sad={sadWeather} />
            <GreenGrass />
            <HomeButton onClick={() => setPageFunction("home")} />

        </div>
    );
}

export default SpecialCowPage;