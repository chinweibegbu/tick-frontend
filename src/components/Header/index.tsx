import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { HeaderProps } from "../../models";
import { logoutUser, resetState } from "../../store/usersSlice";

import LinkText from "../LinkText";
import { notifyError } from "../../utils/notifications";

// ----------------------  END IMPORTS ---------------------------------

function Header({ goToPage }: HeaderProps) {

    const dispatch = useDispatch<AppDispatch>();
    const { errorMessage } = useSelector((state: RootState) => state.usersReducer);

    // @ts-ignore
    const logout = (e: React.MouseEvent<HTMLElement>, path?: string): void => {
        const token = localStorage.getItem("token");
        dispatch(logoutUser({ token: token! }))
            .then((response) => {
                if (response.type === "logoutUser/fulfilled") {
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

    const token = localStorage.getItem("token");

    return (
        <div className="Header h-14 bg-green flex justify-between items-center px-12 ">
            <div className="Logo size-10 rounded-full flex hover:cursor-pointer" onClick={(e) => goToPage(e)}>
                <i className="bi-check-square-fill text-neutral-100 text-icon-regular mr-2" />
                <p className="font-exo font-bold text-neutral-100 text-subtitle mx-auto pt-[0.15rem]">TICK</p>
            </div>
            <div className="text-neutral-100">
                {
                    (token)
                        ? <LinkText text="Log out" goToPage={logout} />
                        : null
                }
            </div>
        </div>
    );
}

export default Header;