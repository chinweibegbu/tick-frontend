import { LinkTextProps } from "../../models";

function LinkText({ text, path, goToPage }: LinkTextProps) {    
    return (
        <p className="font-tabular text-small underline hover:font-medium hover:cursor-pointer" onClick={(e) => goToPage(e, path)}>
            {text}
        </p>
    );
}

export default LinkText;