import './special.css'
import { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const getWeather = async () => {
    const res = await fetch(`api/weather?city=${city}`);
    const json = await res.json();
    setData(json);
  };

  return (
    <div>
      <input
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={getWeather}>Get Weather</button>

      {data && !data.error && (
        <p>
          There is {data.description} in {data.city}.  
          It feels like {data.feels_like}°C  
          (High {data.high}°C / Low {data.low}°C)
        </p>
      )}

      {data?.error && <p>{data.error}</p>}
    </div>
  );
}

function SpecialCowImage() {
    return (
        <img src="src\SpecialCowPage\assets\special_cow.png" alt="cow with pink and purple spots" className='cow_image'/>
    )
}

function GreenGrass() {
    return (
        <img src="src\SpecialCowPage\assets\green_grass.png" className="green_grass"/>
    )
}

function ClearSky() {
    return (
        <img src="src\SpecialCowPage\assets\blue_sky.png" className="clear_sky"/>
    )
}

function Sun() {
    return (
        <img src="src\SpecialCowPage\assets\sun.png" className='sun'/>
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
        <img src="src\SpecialCowPage\assets\grey_sky.png" className="grey_sky"/>
    )
}

function SpecialCowPage() {

    return (
        <div>
            <button onClick={() => props.setPageFunction("home")}>back</button>
            <p>this is special cow page</p>
            <ClearSky />
            <GreySky />
            <SpecialCowImage />
            <GreenGrass />
            <Sun />
            <Weather />
            <GreyClouds />
            <WhiteClouds />
            <Rain />
            <Snow />
        </div>  
    )
}

export default SpecialCowPage;