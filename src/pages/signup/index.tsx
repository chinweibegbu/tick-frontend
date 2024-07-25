import { MouseEventHandler } from "react";

type SignupProps = {
    goHome: MouseEventHandler
}

function Signup({ goHome }: SignupProps) {
    return (
        <div className="Signup">
            <i className="bi-arrow-left-short text-subtitle" onClick={goHome}/>
            Sign Up
        </div>
    );
}

export default Signup;