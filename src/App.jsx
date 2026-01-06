import { useState } from 'react'
import './App.css'
// ^ that's how you import css files

import BigCowPage from './BigCowPage/BigCowPage'
import SpecialCowPage from './SpecialCowPage/SpecialCowPage'
import BabyCowPage from './BabyCowPage/BabyCowPage'

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
        <h1>hello this is safia's header</h1>
        <p>hiiiii i am cow</p>
        <button onClick={setCurrentPage("bigcow")}>click me!</button>
      </div>
    )
  } else if (CurrentPage == "bigcow") {
    return (
      <BigCowPage />
    )
  } else if (CurrentPage == "babycow") {
    return (
      <BabyCowPage />
    )
  } else if (CurrentPage == "specialcow") {
    return (
      <SpecialCowPage />
    )
  }

}

export default App
