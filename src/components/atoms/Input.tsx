import React, { PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { FormContext } from "../Form";

type Props = {
    name: string,
    type?: HTMLInputElement['type'],
    accept?: string,
    capture?: "environment" | "user";
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
const fileToBase64 = (file: File | undefined) => {
    return new Promise<string | undefined>(resolve => {
        if (!file) {
            resolve(undefined);
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log("onLoad");
            resolve((reader?.result as string)?.split?.(',')[1]);
        }
    })
}
export const Input = (props: Props) => {
    const { state, setState } = useContext(FormContext);
    const ref = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (props.type !== "file") {
            return;
        }
        if (ref.current) {
            ref.current.value = null as any;
        }

    }, [props.type, ref])
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        if (props.type === "file") {
            fileToBase64(file).then(fileData => {
                console.log("then");
                setState({ ...state, [props.name]: fileData })
            })
            return;
        }
        setState({ ...state, [props.name]: e.target.value })
    }, [props.type, setState, state])
    const value = useMemo(() => {
        if (props.type === "file") {
            return undefined;
        }
        return state[props.name];
    }, [state])

    useEffect(() => {
        ref.current && setState({ ...state, [props.name]: ref.current.value });
    }, [ref.current]);

    return <label className="input">
        <span className="input-name">{lowercaseIgnoringGroups(stringToSentence(props.name))}</span>
        <input ref={ref} type={props.type ?? "text"}
            value={value as string}
            capture={props.capture}
            accept={props.accept}
            onChange={onChange}
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
