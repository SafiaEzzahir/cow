
function BigCowPage(props) {
    return (
        <div>
            <button onClick={() => props.setPageFunction("home")}>back</button>
            <p>this is big cow page</p>
        </div>
    )
}

export default BigCowPage;
// ^ export it to use it in other files