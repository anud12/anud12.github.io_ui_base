import React, { CSSProperties, Fragment, ReactNode } from "react"
import { CardContainer, Container } from "./Container"
import { Divider } from "./Divider"
import { Link } from "./Link"

type Props = {
    title?: ReactNode
}

export const Table = (props: Props) => {
    return <Fragment>
        <Divider />
        <CardContainer>
            {props.title && <div>
                <div className="table-title">
                    {props.title}
                </div>
            </div>}
            <div className="table-container">
                <div className="table" style={{ "--number-of-columns": "21", "--number-of-rows": "20" } as CSSProperties}>
                    <div className="row">
                        <Link href="./add">
                            Add
                        </Link>
                        {
                            new Array(20).fill("").map((e, jndex) =>
                                <div key={jndex}>Header: {jndex}</div>
                            )
                        }
                    </div>
                    {new Array(10).fill("").map((e, index) =>
                        <div key={index} className="row">
                            <div>
                                <Link href="#">
                                    Delete
                                </Link>
                            </div>
                            {
                                new Array(20).fill("").map((e, jndex) =>
                                    <div key={jndex}>Cell with long value maybe item: {index} - property: {jndex}</div>
                                )
                            }
                        </div>
                    )}
                </div>
            </div >
        </CardContainer>

    </Fragment>
}