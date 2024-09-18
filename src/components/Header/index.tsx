import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { HeaderProps } from "../../models";
import { logoutUser, resetState } from "../../store/usersSlice";
import { notifyError } from "../../utils/notifications";

// ----------------------  END IMPORTS ---------------------------------

function Header({ goToPage }: HeaderProps) {

    const dispatch = useDispatch<AppDispatch>();
    const { currentUser, errorMessage } = useSelector((state: RootState) => state.usersReducer);

    // @ts-ignore
    const logout = (e: React.MouseEvent<HTMLElement>, path?: string): void => {
        const token = localStorage.getItem("token");
        dispatch(logoutUser({ token: token! }))
            .then((response) => {
                if (response.type === "logoutUser/fulfilled") {
                    // Hide dropdown
                    setIsDropdownVisible(false);
                    // Go to dashboard
                    goToPage(e);
                }
            });
    }

    useEffect(() => {
        if (errorMessage) {
            notifyError(errorMessage);
            dispatch(resetState());
        }
    }, [errorMessage]);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="Header h-14 bg-green flex justify-between items-center px-12 ">
            <div className="Logo size-10 rounded-full flex hover:cursor-pointer" onClick={(e) => goToPage(e)}>
                <i className="bi-check-square-fill text-neutral-100 text-icon-regular mr-2" />
                <p className="font-exo font-bold text-neutral-100 text-subtitle mx-auto pt-[0.15rem]">TICK</p>
            </div>
            <div className="text-neutral-100">
                {
                    (currentUser?.id) ?
                        <div
                            className="flex *:my-auto border-2 rounded-md py-1 px-2 gap-2 hover:cursor-pointer"
                            onClick={toggleDropdown}>
                            <i
                                id="logoutDropdown"
                                className={isDropdownVisible ? "bi-caret-up" : "bi-caret-down"}
                                aria-expanded={isDropdownVisible}
                                aria-haspopup="true" />
                            {
                                isDropdownVisible &&
                                (
                                    <div
                                        className="absolute top-[3.3rem] right-[1.9rem] rounded-md bg-neutral-100 border border-neutral-70"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="logoutDropdown"
                                        tabIndex={-1}>
                                        <div role="none">
                                            <div
                                                className="flex p-2 text-neutral-400 border-neutral-100 hover:text-neutral-0"
                                                role="menuitem"
                                                tabIndex={-1}
                                                onClick={logout}>
                                                <i className="bi-box-arrow-left"></i> <p className="ms-2">Logout</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <img className="size-[30px] rounded-full" src={currentUser.profileImageUrl ? currentUser.profileImageUrl : "profile-photo-placeholder.png"} alt={currentUser.firstName} />
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

export default Header;