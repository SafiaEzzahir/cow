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
      body: JSON.stringify({ prompt: "A cute baby cow in a field" }),
    });
    const data = await response.json();
    setImage(data.image);
    setLoading(false);
  }

  return (
    <div id="BabyCowPage">
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate Baby Cow Image"}
      </button>
      <img
        id="Cow"
        src={image ? `data:image/png;base64,${image}` : "src/assets/cow.jpeg"}
        alt="Baby Cow"
      />
      <img id="Steak" src="src/assets/cow.jpeg" alt="Baby Steak" />
    </div>
  );
}

export default BabyCowPage;
