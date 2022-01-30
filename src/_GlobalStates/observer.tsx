import { interval, Subject } from "rxjs";
import { filter, take } from "rxjs/operators";


export const SUBJECT = new Subject()
export const SUBJECT_INTERVAL = interval(1000)
