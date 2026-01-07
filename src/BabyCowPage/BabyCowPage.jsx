/**
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import "./BabyCowPage.css";
import { useState } from "react";
//import useSound from "use-sound";

function BabyCowPage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    setLoading(true);
    const response = await fetch("http://localhost:8787/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: "anime pink cute baby cow creepy with evil eyes and bloody knife" }),
    });
    const data = await response.json();
    setImage(data.image);
    setLoading(false);
  }

  return (
    <div id="BabyCowPage">
    <h1> A friend just for you!</h1>
    
    <button id="GenerateCow" onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Meet your new baby cow friend :3"}
    </button>

    <img
        id="Cow"
        src={image ? image : "./assets/cow.jpeg"}
        alt="Baby Cow"
      />
    <img id="Steak" src="./assets/cow.jpeg" alt="Baby Steak" />
    </div>
  );
}

export default BabyCowPage;
