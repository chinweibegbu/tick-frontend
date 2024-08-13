import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

// ----------------------  END IMPORTS ---------------------------------

function Landing() {
    const navigate = useNavigate();
    const handleClick = (path: string) => {
        navigate("/"+path);
    }
    
    return (
        <div className="Landing h-full pb-20 flex flex-col items-center justify-center">
            <p className="font-exo font-black text-title">
                TICK
            </p>
            <p className="font-tabular font-normal text-subtitle max-w-[75%] lg:max-w-md text-center">
                Your efficient and streamlined task management system
            </p>

            <div className="mt-10 md:w-[40%] lg:w-[25%] flex flex-col md:flex-row md:justify-between">
                <Button text="Sign Up" handleClick={() => handleClick("signup")} />
                <Button text="Sign In" handleClick={() => handleClick("signin")} />
            </div>
        </div>
    );
}

export default Landing;