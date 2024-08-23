import { ButtonProps } from "../../models";

function Button({ text, handleClick, isDelete }: ButtonProps) {
    return (
        <button
            className={"Button font-tabular font-medium text-regular py-2 px-6 rounded-md" + (
                (!isDelete)
                    ? " border-4 border-green bg-green text-neutral-100 hover:bg-green-dark hover:border-green-dark"
                    : " border-4 border-red-light bg-red-light text-neutral-100 hover:bg-red-dark hover:border-red-dark"
            )}
            onClick={handleClick}
            type="submit" >
            {text}
        </button >
    );
}

export default Button;