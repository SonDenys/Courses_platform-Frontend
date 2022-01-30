import { useEffect } from "react";
import { useRecoilState, RecoilState, SetterOrUpdater } from "recoil";
import { SUBJECT } from "./observer";
import { filter, take } from "rxjs/operators";
import konsole from "../konsole";
import { S } from "../utils";



// export function useExternalRecoilState<T>(recoilState: RecoilState<T>): [T, SetterOrUpdater<T>] {
export function useExternalRecoilState<T>(recoilState: any): any[] {
    const [value, setValue] = useRecoilState<T>(recoilState)
    const key: any = recoilState.key
    // const func: Function = callback as any


    useEffect(() => {
        const subs = SUBJECT.pipe(filter((x: any) => {
            konsole.log(`useExternalRecoilState === ${S(x)} key === ${key}`)
            // konsole.log(`useExternalRecoilState === ${S(x)} key === ${key}`)
            return x.key === key
        })).subscribe({
            next: (x: any) => {
                konsole.log(`useExternalRecoilState INSIdE === ${S(x)}`)

                const value = x.value
                setValue(value)
                // if (func) {
                //     if (func.constructor.name === "AsyncFunction") {
                //         (async () => {
                //             await func(value)
                //         })()
                //     } else {
                //         func(value)
                //     }
                // }
            }
        })

        return () => {
            subs.unsubscribe()
        }
    })
    return [value, setValue]
}
