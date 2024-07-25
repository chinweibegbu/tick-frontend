import { MouseEventHandler } from "react";

type HeaderProps = {
    goToPage: MouseEventHandler
}

function Header({ goToPage }: HeaderProps) {
    return (
        <div className="Header h-14 bg-green flex items-center">
            <div className="Logo size-10 ml-2 rounded-full flex items-center">
                <i className="bi-check-square-fill text-neutral-100 text-icon-regular" onClick={(e) => goToPage(e)} />
            </div>
        </div>
    );
}

export default Header;