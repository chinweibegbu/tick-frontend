import { ButtonWithLoaderProps } from "../../models";
import SpinnerLoader from "../SpinnerLoader";

function ButtonWithLoader({ text, isDelete }: ButtonWithLoaderProps) {
    return (
        <button
            className={"Button flex gap-2 mx-auto items-center font-tabular font-medium text-regular py-2 px-6 rounded-md" + (
                (!isDelete)
                    ? " border-4 border-green bg-green text-neutral-100 hover:bg-green-dark hover:border-green-dark disabled:bg-green-light disabled:border-green-light"
                    : " border-4 border-red-light bg-red-light text-neutral-100 hover:bg-red-dark hover:border-red-dark disabled:bg-red-light disabled:border-red-light"
            )}
            disabled
            type="submit" >
            <SpinnerLoader />
            {text}
        </button >
    );
}

export default ButtonWithLoader;