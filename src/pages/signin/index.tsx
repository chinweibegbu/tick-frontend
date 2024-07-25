import { MouseEventHandler } from "react";


type SigninProps = {
    goHome: MouseEventHandler
}

function Signin({ goHome }: SigninProps) {
    

    return (
        <div className="Signin">
            <i className="bi-arrow-left-short text-subtitle" onClick={goHome}/>
            Sign In
        </div>
    );
}

export default Signin;