import React, { CSSProperties } from "react"
import { Action } from "./Action"

export const Table = () => {
    return <div className="table-container">
        <div className="table" style={{ "--number-of-columns": "21", "--number-of-rows": "20" } as CSSProperties}>
            {new Array(10).fill("").map((e, index) =>
                <div className="row">
                    {/* <button>First {index}</button> */}
                    <Action />
                    {
                        new Array(20).fill("").map((e, jndex) =>
                            <div>Cell with long value maybe item: {index} - property: {jndex}</div>
                        )
                    }
                </div>
            )}
        </div>
    </div >
}