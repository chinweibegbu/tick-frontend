import { HeaderProps } from "../../models";
import LinkText from "../LinkText";

function Header({ goToPage, isLoggedIn }: HeaderProps) {
    return (
        <div className="Header h-14 bg-green flex justify-between items-center px-12 ">
            <div className="Logo size-10 rounded-full flex" onClick={(e) => goToPage(e)}>
                <i className="bi-check-square-fill text-neutral-100 text-icon-regular mr-2" />
                <p className="font-exo font-bold text-neutral-100 text-subtitle mx-auto pt-[0.15rem]">TICK</p>
            </div>
            <div className="text-neutral-100">
                {
                    isLoggedIn
                        ? <LinkText text="Log out" goToPage={goToPage} />
                        : null
                }
            </div>
        </div>
    );
}

export default Header;