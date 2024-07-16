import { ButtonHTMLAttributes, JSX } from "react";

type Props =  ButtonHTMLAttributes<HTMLButtonElement> & {
    id: string
    children: string | JSX.Element
};

export function Button(props: Props) {
    return (
        <button {...props}>
            {props.children}
        </button>
    );
};