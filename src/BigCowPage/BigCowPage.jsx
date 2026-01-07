import { useState, useRef, useEffect } from 'react'

import './BigCowPage.css'

import cowImage from '/src/assets/cow.png'

function ImpossibleButton({ onClick }) {
    const containerRef = useRef(null)
    const buttonRef = useRef(null)

    const [pos, setPos] = useState({ x: 180, y: 120 })

    const speed = 12
    const dangerRadius = 200

    useEffect(() => {
        function handleMouseMove(e) {
            const container = containerRef.current
            const button = buttonRef.current
            if (!container || !button) return

            const containerRect = container.getBoundingClientRect()
            const buttonRect = button.getBoundingClientRect()

            const mouseX = e.clientX - containerRect.left
            const mouseY = e.clientY - containerRect.top

            const centerX = pos.x + buttonRect.width / 2
            const centerY = pos.y + buttonRect.height / 2

            const dx = centerX - mouseX
            const dy = centerY - mouseY
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < dangerRadius) {
                const angle = Math.atan2(dy, dx)

                let newX = pos.x + Math.cos(angle) * speed
                let newY = pos.y + Math.sin(angle) * speed

                // keep inside container
                newX = Math.max(0, Math.min(containerRect.width - buttonRect.width, newX))
                newY = Math.max(0, Math.min(containerRect.height - buttonRect.height, newY))

                setPos({ x: newX, y: newY })
            }
        }

        const container = containerRef.current
        container.addEventListener('mousemove', handleMouseMove)

        return () => container.removeEventListener('mousemove', handleMouseMove)
    }, [pos])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: '1000px',
                height: '300px',
                overflow: 'hidden'
            }}
        >
            <button
                ref={buttonRef}
                onClick={onClick}
                style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y,
                    padding: '12px 24px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff',
                    border: '0px'
                }}
            >
                go back
            </button>
        </div>
    )
}

function BigCowCanvas() {
    const canvasRef = useRef(null)
    const imageRef = useRef(new Image())

    const cow = useRef({
        x: 200,
        y: 150,
        width: 80,
        height: 160,
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
            
            <ImpossibleButton onClick={() => props.setPageFunction("home")}/>
            <BigCowCanvas/>
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