import { useState } from 'react'
import './App.css'

import BigCowPage from './BigCowPage/BigCowPage'
import SpecialCowPage from './SpecialCowPage/SpecialCowPage'
import BabyCowPage from './BabyCowPage/BabyCowPage'
import TriangleIMG from "/src/assets/tr.png"
import MainCowIMG from "/src/assets/main_cow.png"
import SpecialCowIMG from "/src/SpecialCowPage/assets/special_cow.png"
import BigCowIMG from "/src/assets/cow.png"
import NakedCowIMG from "/src/assets/naked_cow.png"
import BackgroundIMG from "/src/assets/background1.png"

function Triangle() {
    return (
      <img src={TriangleIMG} className='triangle'/>
    )
}

function MainCow() {
    return (
      <img src={MainCowIMG} className='main_cow'/>
    )
}

function SpecialCowImage() {
    return (
      <img src={SpecialCowIMG} className='special_cow_image'/>
    )
}

function BigCowImage() {
    return (
      <img src={BigCowIMG} className='big_cow_image'/>
    )
}

function BabyCowImage() {
    return (
      <img src={NakedCowIMG} className='baby_cow_image'/>
    )
}

function Background() {
    return (
      <img src={BackgroundIMG} className='background'/>
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
      <div className='App'>
        <button onClick={() => setCurrentPage("bigcow")} className='big_cow'>GO TO BIG COW</button>
        <button onClick={() => setCurrentPage("specialcow")} className='special_cow'>GO TO SPECIAL COW</button>
        <button onClick={() => setCurrentPage("babycow")} className='little_cow'>GO TO BABY COW</button>
        <Triangle />
        <MainCow />
        <SpecialCowImage />
        <BigCowImage />
        <BabyCowImage />
        <Background />
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
