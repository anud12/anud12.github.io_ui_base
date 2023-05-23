import React from "react"

export const Table = () => {
    return <div className="table-container">
        <table className="table">
            <thead>
                {new Array(20).fill("").map((e, index) => <th>
                    Header {index}
                </th>)}
            </thead>
            <tbody>
                {new Array(10).fill("").map((e, index) =>
                    <tr>
                        {new Array(20).fill("").map((e, jndex) =>

                            <td>Cell with long value maybe {index} - {jndex}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}