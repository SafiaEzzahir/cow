
function SpecialCowImage() {
    return (
        <img src="src/assets/special_cow.png" alt="cow with pink and purple spots" />
    )
}

function SpecialCowPage(props) {
    return (
        <div>
            <button onClick={() => props.setPageFunction("home")}>back</button>
            <p>this is special cow page</p>
            <SpecialCowImage />
        </div>
    )
}

export default SpecialCowPage;
// ^ export it to use it in other files