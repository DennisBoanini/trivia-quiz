import { SelectHTMLAttributes } from "react";
import { Option } from "../../models/Option.ts";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
    id: string
    label: string
    options: Option[]
    placeholder: string
}

export default function Select(props: Props) {
    return (
        <div>
            <label style={{display: 'flex', flexDirection: "column", gap: "5px"}}>
                {props.label}
                <select {...props} id={props.id}>
                    <option value={''}>{props.placeholder}</option>
                    {props.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}