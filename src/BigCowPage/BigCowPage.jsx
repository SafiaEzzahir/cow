import { useState } from 'react'

import './BigCowPage.css'

function MainGame(props) {
    return(
        <div className='Fullscreen GrassBackground'>
            <button onClick={() => props.setPageFunction("home")}>back</button>
            <p>this is big cow page</p>
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