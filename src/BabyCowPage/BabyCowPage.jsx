
import "./BabyCowPage.css";
import { useState } from "react";
//import useSound from "use-sound";
//hii

import PinkBackground from '/src/assets/pink.jpeg'

function BabyCowPage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState([]);

  async function generateImage() {
    setLoading(true);
    const response = await fetch("http://localhost:8787/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          "anime pink cute baby cow creepy with evil eyes and bloody knife and wearing" + likes.join(", "),
      }),
    });
    const data = await response.json();
    setImage(data.image);
    setLoading(false);
    setLikes([]);
  }

  return (
    <div id="BabyCowPage"
      style={{
          backgroundImage: `url(${PinkBackground})`,
          backgroundSize: 'cover',}}
    >
      <h1> A friend just for you!</h1>

      <div id="PreferenceButtons">
        <button id="Button" onClick={() => setLikes([...likes, "Strawberry"])}>
          <img src="./assets/strawberry.png" alt="Strawberry" width="100" height="100"/>
          Strawberry
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "Spaghetti"])}>
          <img src="./assets/spaghetti.png" alt="Spaghetti" width="100" height="100"/>
          Spaghetti
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "Steak"])}>
          <img src="./assets/steak.png" alt="Steak" width="100" height="100"/>
          Steak
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "Boba Tea"])}>
          <img src="./assets/boba.png" alt="Boba" width="100" height="100"/>
          Boba
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "Pizza"])}>
          <img src="./assets/pizza.png" alt="Pizza" width="100" height="100"/>
          Pizza
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "With 9 tiny baby cows"])}>
          <img src="./assets/baby-cow.png" alt="Baby Cow" width="100" height="100"/>
          Baby Cows
        </button>
      </div>

      <button id="GenerateCow" onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Meet your new baby cow friend :3"}
      </button>

      <img id="Cow" src={loading? "./assets/loading.gif" : (image ? image : "./assets/cow.jpeg")} alt="Baby Cow" />

      <button id="HomeButton" onClick={() => window.location.href = "/"}>Bye bye</button>
    </div>
  );
}

export default BabyCowPage;
