import React, {CSSProperties, Fragment, ReactNode, useEffect, useMemo, useState} from "react"
import {loadFromSheet} from "../service/google/loadFromSheet"
import {newApi} from "../service/impl/newApi"
import {CardContainer} from "./Container"

type Props<T> = {
  title?: ReactNode
  source: string,
  columnOrder?: Array<keyof T>,
  cellValues?: Record<keyof T, (row: T) => ReactNode>
}

export const Table = <T extends any>(props: Props<T>) => {
  const [data, setData] = useState<Array<any>>([]);
  const loadData = async () => {
    const data = await loadFromSheet(props.source);
    const changedData = data.map(e => {
      Object.entries(props.cellValues ?? {}).map(([key, value]) => {
        const func:Function = value as any;
        e[key] = func(e);
      })
      return e;
    })
    setData(changedData)
  }
  useEffect(() => {
    const unsubscribe = newApi.onChange(loadData)
    return () => unsubscribe();
  }, [props.source])

  const columns:Array<any> = useMemo(() => {
    const columnSet = new Set();
    props.columnOrder?.map(e => columnSet.add(e));
    Object.keys(data?.[0] ?? {}).map(e => columnSet.add((e)));
    return [...columnSet];
  }, [data, JSON.stringify(props.columnOrder)]);

  return <Fragment>
    <CardContainer>
      <div className="table-container">
        {data instanceof Array && data.length > 0 &&
            <div className="table" style={{
              "--number-of-columns": columns.length,
              "--number-of-rows": "20"
            } as CSSProperties}>

                <div className="row">
                  {
                    columns.map((header, jndex) =>
                      <div key={jndex}>{header}</div>
                    )
                  }
                </div>
              {data.map((e, index) =>
                <div key={index} className="row">
                  {
                    columns.map((column) =>
                      <div key={column}>{e[column]}</div>
                    )
                  }
                </div>
              )}
            </div>
        }
        {!(data instanceof Array) && <pre style={{whiteSpace: "break-spaces"}}>
                    Failed to load table {props.source} Reason:
                    <br/>
          {JSON.stringify(data, null, 2)}
                </pre>}
      </div>
    </CardContainer>

  </Fragment>
}