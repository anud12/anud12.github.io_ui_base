import React, { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { FormContext } from "../Form";

type Props = {
    name: string,
    type?: HTMLInputElement['type']
}

const kebabToSentence = (str: string) => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const camelToSentence = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

const snakeToSentence = (str: string) => str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const lowercaseIgnoringGroups = (str: string) => str.replaceAll(/([a-z]|\s)([A-Z])([a-z]|\s)/g, (match, p1, p2, p3) => p1 + p2.toLowerCase() + p3);

const stringToSentence = str => {
    if (str.includes('-')) {
        return kebabToSentence(str);
    } else if (str.includes('_')) {
        return snakeToSentence(str);
    } else {
        return camelToSentence(str);
    }
};
export const Input = (props: Props) => {
    const { state, setState } = useContext(FormContext);
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        ref.current && setState({ ...state, [props.name]: ref.current.value });
    }, [ref.current]);

    return <label className="input">
        <span className="input-name">{lowercaseIgnoringGroups(stringToSentence(props.name))}</span>
        <input ref={ref} type={props.type ?? "text"}
            value={state[props.name] as string ?? ""}
            onChange={(e) => setState({ ...state, [props.name]: e.target.value })}
        />
    </label>
}
export const Select = (props: PropsWithChildren<{ name: string }>) => {
    const { state, setState } = useContext(FormContext);
    const ref = useRef<HTMLSelectElement | null>(null);
    useEffect(() => {
        ref.current && setState({ ...state, [props.name]: ref.current.value });
    }, [ref.current])
    return <label className="input">
        <span className="input-name">{lowercaseIgnoringGroups(stringToSentence(props.name))}</span>
        <select ref={ref} name={props.name}
            value={state[props.name] as string ?? ""}
            onChange={(e) => setState({ ...state, [props.name]: e.target.value })}
        >
            {props.children}
        </select>
    </label >
}
