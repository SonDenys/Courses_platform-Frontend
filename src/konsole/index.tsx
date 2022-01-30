


export let konsole: any = {};

let methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
];

let nop = function (x) { };

export function enable_konsole() {
    for (let k in methods) {
        let m = methods[k];
        try {
            konsole[m] = (...param) => console[m](...param);
        } catch (e) {
            konsole[m] = nop;
            console.log(e);
        }
    }
}

export function disable_konsole() {

    let _console = konsole || {};
    for (let k in methods) {
        try {
            _console[methods[k]] = nop;
        } catch (e) {
            console.log(e);
        }

    }
    konsole = _console;
}

konsole["disable"] = disable_konsole;
konsole["enable"] = enable_konsole;

(window as any).__enable_console = enable_konsole;
(window as any).__disable_console = disable_konsole;


if (process.env.REACT_APP_MODE === "prod") {
    disable_konsole()
} else {
    enable_konsole()
}

export default konsole;