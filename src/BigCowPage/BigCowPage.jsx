import { useState, useRef, useEffect } from 'react'

import './BigCowPage.css'

import cowImage from '/src/assets/cowjumpscare.png'

function LittleCowCanvas() {
    const canvasRef = useRef(null)
    const imageRef = useRef(new Image())

    const cow = useRef({
        x: 200,
        y: 200,
        width: 80,
        height: 80,
        speed: 20
    })

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        canvas.width = 500
        canvas.height = 300

        imageRef.current.src = cowImage

        function drawCow() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.drawImage(
                imageRef.current,
                cow.current.x,
                cow.current.y,
                cow.current.width,
                cow.current.height
            )
        }

        function handleKeyDown(e) {
            if (e.key === 'ArrowLeft') {
                cow.current.x = Math.max(0, cow.current.x - cow.current.speed)
            }

            if (e.key === 'ArrowRight') {
                cow.current.x = Math.min(
                    canvas.width - cow.current.width,
                    cow.current.x + cow.current.speed
                )
            }

            drawCow()
        }

        imageRef.current.onload = drawCow
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className='Canvas'
        />
    )
}

function MainGame(props) {
    return(
        <div className='Fullscreen GrassBackground' id='MainGame'>
            <LittleCowCanvas/>
            <button onClick={() => props.setPageFunction("home")}>back</button>
            <p>this is big cow page</p>
            <div id='Grass'></div>
        </div>
    )
}

function Jumpscare(props) {

    setTimeout(() => props.setStage("next"), 300)

    return(
        <div id="Jumpscare">
            <img src="./src/assets/cowjumpscare.png" alt="a scary cow is looking at you" />
        </div>
    )
}


function BigCowPage(props) {
    const [BigCowStage, setBigCowStage] = useState("jumpscare")

    if (BigCowStage == "jumpscare") {
        return <Jumpscare setStage={setBigCowStage} />
    } else {
        return (
            <MainGame setPageFunction={props.setPageFunction} />
        )
    }

}

export default BigCowPage;
// ^ export it to use it in other files