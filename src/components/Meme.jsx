import React, { useState, useEffect } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/3po4m7.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const num = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[num].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      topText: "",
      bottomText: "",
      randomImage: url,
    }));
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  return (
    <main className="container mt-3 mt-md-4">
      <p className="mb-3 text-center d-md-none">
        Choose image, write text, make your meme 👻
      </p>
      <div className="row">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <input
            type="text"
            placeholder="Top text"
            className="meme-input col-12 col-md-11"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="text"
            placeholder="Bottom text"
            className="meme-input col-12 col-md-11"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mt-3 d-flex justify-content-center">
          <button
            className="meme-btn col-8 col-md-6 border-0 rounded text-light"
            onClick={getMemeImage}
          >
            Get a new meme image 🖼️
          </button>
        </div>
      </div>
      <div className="meme mt-3 mb-3 d-flex justify-content-center">
        <img src={meme.randomImage} className="meme-img" />
        <h2 className="meme-caption top">{meme.topText}</h2>
        <h2 className="meme-caption bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
