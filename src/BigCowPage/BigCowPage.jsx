import { useState } from 'react'

import './BigCowPage.css'


function Jumpscare() {
    return(
        <div id="Jumpscare">
            <p>boooooooooo</p>
        </div>
    )
}

function BigCowPage(props) {
    const [BigCowStage, setBigCowStage] = useState("jumpscare")

    if (BigCowStage == "jumpscare") {
        return <Jumpscare />
    } else {
        return (
            <div>
                <button onClick={() => props.setPageFunction("home")}>back</button>
                <p>this is big cow page</p>
                <Jumpscare />
            </div>
        )
    }

}

export default BigCowPage;
// ^ export it to use it in other files