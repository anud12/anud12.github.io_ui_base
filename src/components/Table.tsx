import React, { CSSProperties, Fragment, ReactNode, useEffect, useState } from "react"
import { loadFromSheet } from "../service/google/loadFromSheet"
import { newApi } from "../service/impl/newApi"
import { CardContainer } from "./Container"
import { Divider } from "./Divider"
import { Title } from "./atoms/Title"

type Props = {
    title?: ReactNode
    source: string,
}

export const Table = (props: Props) => {
    const [data, setData] = useState<Array<any> | string>([]);
    const loadData = async () => {
        const data = await loadFromSheet(props.source)
            .catch(e => e);
        setData(data)
    }
    useEffect(() => {
        const unsubscribe = newApi.onChange(loadData)
        return () => unsubscribe();
    }, [props.source])
    return <Fragment>
        <Divider />
        <CardContainer>
            {props.title &&
                <Title>
                    {props.title}
                </Title>}
            <div className="table-container">
                {data instanceof Array && <div className="table" style={{ "--number-of-columns": Object.keys(data?.[0] ?? {}).length, "--number-of-rows": "20" } as CSSProperties}>
                    <div className="row">
                        {
                            Object.keys(data?.[0] ?? {}).map((header, jndex) =>
                                <div key={jndex}>{header}</div>
                            )
                        }
                    </div>
                    {data.map((e, index) =>
                        <div key={index} className="row">
                            {
                                Object.values(e).map((column, jndex) =>
                                    <div key={jndex}>{String(column)}</div>
                                )
                            }
                        </div>
                    )}
                </div>
                }
                {!(data instanceof Array) && <pre style={{ whiteSpace: "break-spaces" }}>
                    Failed to load table {props.source} Reason:
                    <br />
                    {JSON.stringify(data, null, 2)}
                </pre>}
            </div >

        </CardContainer>

    </Fragment>
}