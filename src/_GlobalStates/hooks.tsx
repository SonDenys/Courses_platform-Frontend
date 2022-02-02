import { useState, useLayoutEffect, useEffect } from "react";
// import { useRecoilState, RecoilState, SetterOrUpdater } from "recoil";
import konsole from "../konsole";
import { SUBJECT } from "./observer";
import { filter } from "rxjs/operators";
import { useToasts } from "react-toast-notifications";


export interface WindowSizeProps {
    width: number
    height: number
}

export function useWindowSize() {
    const [size, setSize] = useState<WindowSizeProps>({ width: 0, height: 0 });

    useLayoutEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => {
            return window.removeEventListener('resize', updateSize)
        };
    });

    return size;
}


export function useInterval(timeout, onInterval: Function) {
    const [timeOut, setTimeOut] = useState(timeout)

    useEffect(() => {
        let counter = 1; // seconds
        const interval = setInterval(() => {
            if (counter < timeOut) {
                counter++;
                return
            }

            if (onInterval) {
                try {
                    onInterval()
                } catch (e) {
                    konsole.error(`onInterval() ${e}`)
                }
            }
            counter = 1
        }, 1000)

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }

    }, [timeOut, onInterval])

    return setTimeOut
}


export function writeToRecoilState(recoilStateVariable, value: any) {
    SUBJECT.next({
        key: recoilStateVariable.key,
        value: value
    })
}

// export function useExternalRecoilState<T>(recoilState: RecoilState<T>): [T, SetterOrUpdater<T>] {
//     const [value, setValue] = useRecoilState<T>(recoilState)
//     const key: any = recoilState.key
//     // const func: Function = callback as any


//     useEffect(() => {
//         const subs = SUBJECT.pipe(filter((x: any) => {
//             return x.key === key
//         })).subscribe({
//             next: (x: any) => {
//                 const value = x.value
//                 setValue(value)
//                 // if (func) {
//                 //     if (func.constructor.name === "AsyncFunction") {
//                 //         (async () => {
//                 //             await func(value)
//                 //         })()
//                 //     } else {
//                 //         func(value)
//                 //     }
//                 // }
//             }
//         })

//         return () => {
//             subs.unsubscribe()
//         }
//     })
//     return [value, setValue]
// }



export function useTickTok(ms, callback) {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (callback) {
                setCounter(counter + 1)
                if (callback.constructor.name === "AsyncFunction") {
                    (async () => {
                        await callback(counter)
                    })()
                } else {
                    callback(counter)
                }
            }
        }, ms)


        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    })

    return counter
}



export function useMouseCapture(handler) {

    useEffect(() => {
        document.addEventListener('mouseup', handler)
        document.addEventListener('mousemove', handler)

    }, [])

    return () => {
        document.removeEventListener('mouseup', handler)
        document.removeEventListener('mousemove', handler)
    }

}


// export function useWindowResize(callback) {
//     const [height, setHeight] = useState(window.innerHeight)
//     const [width, setWidth] = useState(window.innerWidth)

//     useEffect(()=>{
//         setHeight(window.innerHeight)
//         setHeight(window.innerHeight)
//     })
// } 


export interface MyToastFunc {
    info: Function
    success: Function
    warning: Function
    error: Function
}

export function useMyToast(): MyToastFunc {
    const { addToast } = useToasts()

    const t: MyToastFunc = {
        info: (content: any) => {
            addToast(content, {
                appearance: "info",
                autoDismiss: true,
            })
        },
        success: (content) => {
            addToast(content, {
                appearance: "success",
                autoDismiss: true
            })
        },
        warning: (content) => {
            addToast(content, {
                appearance: "warning",
                autoDismiss: true
            })
        },
        error: (content) => {
            addToast(content, {
                appearance: "error",
                autoDismiss: true
            })
        },
    }

    return t;
}



export const useOnline = (callback?: Function) => {
    const [isOnline, setIsOnline] = useState<boolean>(false)


    useEffect(() => {
        const updateStatus = () => {
            const _status = navigator.onLine;
            setIsOnline(_status)
            if (callback) {
                callback(_status)
            }
        }
    
        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);
        return () => {
            window.removeEventListener("online", updateStatus)
            window.removeEventListener("offline", updateStatus)
        }
    }, [])

    return isOnline
}

