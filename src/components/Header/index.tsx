import { MouseEventHandler } from "react";

type HeaderProps = {
    goHome: MouseEventHandler
}

function Header({ goHome }: HeaderProps) {
    return (
        <div className="Header h-14 bg-green flex items-center">
            <div className="Logo size-10 ml-2 rounded-full">
                <i className="bi-check-square-fill text-neutral-100 text-subtitle" onClick={goHome} />
            </div>
        </div>
    );
}

export default Header;