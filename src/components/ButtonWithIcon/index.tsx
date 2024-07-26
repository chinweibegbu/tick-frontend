import { MouseEventHandler } from "react";

type ButtonWithIconsProps = {
    text: string
    iconClass: string
    handleClick?: MouseEventHandler
};

function ButtonWithIcons({ text, iconClass, handleClick }: ButtonWithIconsProps) {
    return (
        <button
            className="font-tabular font-medium text-regular px-4 rounded-md text-neutral-100 bg-green-light hover:bg-green active:bg-green-dark flex items-center"
            onClick={handleClick}
            type="submit">
            <i className={"bi-" + iconClass + " text-icon-large mr-4"} />
            {text}
        </button>
    );
}

export default ButtonWithIcons;