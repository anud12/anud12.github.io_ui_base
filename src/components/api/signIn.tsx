import React, {useCallback, useEffect, useState} from "react";
import {newApi} from "../../service/impl/newApi";
import {Button} from "../atoms/Button";

export const SignIn = () => {
    const [state, setState] = useState<string | undefined>(undefined);
    const callback = useCallback(() => {
        if (state) {
            newApi.logout();
            return;
        }
        newApi.login();
    }, [state])
    useEffect(() => {
        newApi.sessionName().then(setState);
        const unsubscribe = newApi.onChange(async e => {
            setState(await newApi.sessionName());
        });
        newApi.loadFromUrl();
        return unsubscribe;
    }, []);
    return <>
        <Button onClick={callback}>
            {state ? `Logout of ${state}` : "Login"}
        </Button>
    </>
}