import React, { Fragment, PropsWithChildren, ReactNode, createContext, useCallback, useState } from "react"
import { uploadFormDataToFolder } from "../service/google/uploadToFile"
import { CardContainer } from "./Container"
import { Button } from "./atoms/Button"
import { Title } from "./atoms/Title"
type Props = PropsWithChildren & {
    title?: ReactNode
    folderId: string
}
export const FormContext = createContext({
    state: {} as Record<string, string | File>,
    setState: (...args) => { }
});

export const Form = (props: Props) => {
    const [state, setState] = useState({});

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        uploadFormDataToFolder(props.folderId, state)(event).then(() => {
            if (!globalThis.document) {
                return;
            }
            iziToast.success({
                icon: 'icon-person',
                title: 'Upload succesfull',
                position: 'bottomRight'
            })
        }).catch((e: Error) => {
            if (!globalThis.document) {
                return;
            }
            //@ts-ignore
            iziToast.error({
                timeout: 20000,
                title: `${e.name}:${e.message}`,
                position: 'bottomRight'
            })
        })
    }, [state])
    return <Fragment>
        <CardContainer>
            {props.title &&
                <Title>
                    {props.title}
                </Title>}
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <FormContext.Provider value={{ state, setState }}>
                    <div className="form-content">
                        {props.children}
                    </div>
                </FormContext.Provider>
                <div className="submit-container">
                    <Button>Submit</Button>
                </div>
            </form>
        </CardContainer>
    </Fragment>
}