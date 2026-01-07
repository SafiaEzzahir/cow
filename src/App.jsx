import { useState } from 'react'
import './App.css'

import BigCowPage from './BigCowPage/BigCowPage'
import SpecialCowPage from './SpecialCowPage/SpecialCowPage'
import BabyCowPage from './BabyCowPage/BabyCowPage'

function Triangle() {
    return (
      <img src="src/assets/tr.png" className='triangle'/>
    )
}

function App() {
  const [CurrentPage, setCurrentPage] = useState("home")
  /* see EXPLANATION for what useState is, basically CurrentPage is a variable,
  and setCurrentPage can change it, leading to a render (so the page changes! - if needed)
  
  when you first do useState() the thing inside the brackets is what you set the
  variable to at the start, in this case: "home"

  to change CurrentPage: just do setCurrentPage(what you want to set it as)*/

  // this is the main app, don't put all of your code straight in here - make other files

  if (CurrentPage == "home"){
    return (
      <div>
        <button onClick={() => setCurrentPage("bigcow")} className='big_cow'>Go to Big Cow</button>
        <button onClick={() => setCurrentPage("specialcow")}>go to specialcow</button>
        <button onClick={() => setCurrentPage("babycow")}>go to babycow</button>
        <Triangle />
      </div>
    )
  } else if (CurrentPage == "bigcow") {
    return (
      <BigCowPage setPageFunction={setCurrentPage} />
    )
  } else if (CurrentPage == "babycow") {
    return (
      <BabyCowPage setPageFunction={setCurrentPage} />
    )
  } else if (CurrentPage == "specialcow") {
    return (
      <SpecialCowPage setPageFunction={setCurrentPage} />
    )
  }

}

export default App
