import React from "react"

export default function Meme() {    

    const [meme, setMeme] = React.useState(
        {
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
        }
    )
    const [allMemes, setAllMemes] = React.useState([]) 

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
            const num = Math.floor(Math.random()*allMemes.length);
            const url = allMemes[num].url
            setMeme(prevMeme => (
                {...prevMeme,
                topText: "",
                bottomText: "",
                randomImage: url 
                }
            )) 
        }
    function handleChange(event) {
        const {name, value} = event.target
            setMeme(prevMeme => {
                return {
                    ...prevMeme,
                    [name]: value
                }
            })
        }
    
    return (
        <main className="main">
            <div className="div">
                <input 
                    type="text" 
                    placeholder="Top text" 
                    className="div-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Bottom text" 
                    className="div-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                className="div-button" onClick={getMemeImage}>Get a new meme image 🖼️</button>
            </div>
            <div className="meme">
            <img src={meme.randomImage} className="meme-image" />
            <h2 className="meme-text top">{meme.topText}</h2>
            <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}