import React, { Fragment, PropsWithChildren, ReactNode, createContext, useCallback, useState } from "react"
import { uploadFormDataToFolder } from "../service/google/uploadToFile"
import { CardContainer } from "./Container"
import { Divider } from "./Divider"
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

    return <Fragment>
        <Divider />
        <CardContainer>
            {props.title &&
                <Title>
                    {props.title}
                </Title>}
            <form className="form" onSubmit={uploadFormDataToFolder(props.folderId, state) as any}>
                <FormContext.Provider value={{ state, setState }}>
                    {props.children}
                </FormContext.Provider>
                <div className="submit-container">
                    <Button>Submit</Button>
                </div>
            </form>
        </CardContainer>
    </Fragment>
}