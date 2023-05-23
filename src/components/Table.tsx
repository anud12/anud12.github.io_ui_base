import React from "react"
import { Action } from "./Action"

export const Table = () => {
    return <div className="table-container">
        <table className="table">
            <thead>
                <th>
                    <a href="./add" className="material-symbols-outlined">
                        add_box
                    </a>
                </th>
                {new Array(20).fill("").map((e, index) => <th>
                    <span>Header {index}</span>
                </th>)}
            </thead>
            <tbody>
                {new Array(10).fill("").map((e, index) =>
                    <tr>
                        <td>Action {index}</td>
                        {new Array(20).fill("").map((e, jndex) =>
                            <td>Cell with long value maybe {index} - {jndex}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}