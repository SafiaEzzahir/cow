
import "./BabyCowPage.css";
import { useState } from "react";
//import useSound from "use-sound";

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
    <div id="BabyCowPage">
      <h1> A friend just for you!</h1>

      <div id="PreferenceButtons">
        <button id="Button" onClick={() => setLikes([...likes, "Strawberry"])}>
          <img src="./assets/strawberry.png" alt="Strawberry" width="100" height="100"/>
          Strawberry
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "Spaghetti"])}>
          Spaghetti
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "Steak"])}>
          Steak
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "Boba Tea"])}>
          Boba
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "Pizza"])}>
          Pizza
        </button>
        <button id="Button" onClick={() => setLikes([...likes, "With 9 tiny baby cows"])}>
          Baby Cows
        </button>
      </div>

      <button id="GenerateCow" onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Meet your new baby cow friend :3"}
      </button>

      <img id="Cow" src={loading? "./assets/loading.gif" : (image ? image : "./assets/cow.jpeg")} alt="Baby Cow" />
      <img id="Steak" src="./assets/cow.jpeg" alt="Baby Steak" />
    </div>
  );
}

export default BabyCowPage;
