type SigninProps = {
    goToPage: Function
}

function Signin({ goToPage }: SigninProps) {

    return (
        <div className="Signin">
            <i className="bi-arrow-left-short text-icon-large" onClick={(e) => goToPage(e)}/>
            Sign In
        </div>
    );
}

export default Signin;