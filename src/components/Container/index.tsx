import { ContainerProps } from "../../models";

function Container({ children }: ContainerProps) {
    return (
        // Height = Total height - Height of Header (3.5rem) - Margin (3rem*2)
        // NOTE: m-12 = 3rem per margin
        <div className="Container h-[calc(100vh-9.5rem)] m-12">
            {children}
        </div>
    );
}

export default Container;