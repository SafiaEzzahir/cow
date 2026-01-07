
function BabyCowPage(props) {
    return (
        <div>
            <button onClick={() => props.setPageFunction("home")}>back</button>
            <p>this is baby cow page</p>
        </div>
    )
}

export default BabyCowPage;
// ^ export it to use it in other files