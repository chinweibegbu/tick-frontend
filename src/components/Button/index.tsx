import { MouseEventHandler } from "react";

type ButtonProps = {
    text: string;
    isFilled: boolean;
    handleClick: MouseEventHandler;
};

function Button({ text, isFilled, handleClick }: ButtonProps) {
    return (
        <button
            className={"font-tabular font-medium text-regular py-2 px-6 rounded-md border-4 border-green" + (isFilled ? " bg-green text-neutral-100 hover:bg-green-dark hover:border-green-dark" : " hover:bg-green-light hover:text-white")}
            onClick={handleClick}>
            {text}
        </button>
    );
}

export default Button;