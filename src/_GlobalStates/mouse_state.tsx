import { SUBJECT_INTERVAL } from "./observer";
import { filter, take } from "rxjs/operators";
import konsole from "../konsole";
import { useEffect, useState } from "react";

let MOUSE_IDLE_TICK = 0

SUBJECT_INTERVAL.subscribe({
    next: () => {
        MOUSE_IDLE_TICK += 1
    }
})

export const MOUSE_IDLE_OBSERVER = SUBJECT_INTERVAL.pipe(filter(x => MOUSE_IDLE_TICK > 10))


// export function registerMouseHideCallback(callback) {
//     if (callback) {
//         MOUSE_IDLE_OBSERVER.subscribe({
//             next: () => {
//                 try {
//                     callback()
//                 } catch (e) {
//                     konsole.log(`could not run mouse callback ${e}`)
//                 }
//                 MOUSE_IDLE_TICK = 0
//             }
//         })
//     } else {
//         konsole.eror(`registerMouseHideCallback callback must be a function: ${callback} given`)
//     }
// }

export function restartMouseTick() {
    MOUSE_IDLE_TICK = 0
}


export const useMouseHide = () => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const subs = SUBJECT_INTERVAL.pipe(filter(() => MOUSE_IDLE_TICK > 10)).subscribe({
            next: () => {
                if (show === true) {
                    setShow(false)
                }
                restartMouseTick()
            }
        })

        return () => {
            if (subs) {
                subs.unsubscribe()
            }

        }
    })

    return [show, setShow]

}