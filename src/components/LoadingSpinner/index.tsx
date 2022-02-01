import React, { useEffect, useLayoutEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Affix, Spin } from "antd";
import { LoadingOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner, faSpider } from "@fortawesome/free-solid-svg-icons";
import {  } from "@heroicons/react/solid";
// import { faSpinner, faSpider } from "@fortawesome/free-solid-svg-icons";
// import { ic   } from "@fortawesome/fontawesome-common-types";
// import { Icon } from "@ant-design/compatible";
import Icon from "@ant-design/icons";
import { showSpinnerState } from "../../_GlobalStates";
import konsole from "../../konsole";
import { interval } from "rxjs";

import SpinnerIcon from "../SpinnerIcon";
import { useTickTok } from "../../_GlobalStates/hooks";


// export const spinnerVisibleState = atom<boolean>({
//     key: "spinnerVisibleState",
//     default: true
// })


const icon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />;
// const fa_spinner = <Icon component={() => <FontAwesomeIcon className="fa fa-spin" icon={faSpinner} color="#2395FF" />} />
// const fa_spinner = <Icon component={()=><FontAwesomeIcon className="fa fa-spin" icon={"spinner"}  color="#2395FF"/>} />
// const fa_spinner1 = <Icon component={()=><i  className="fa">&#xf110;</i>} />
// const fa_spinner = <Icon component={()=><i className="fa fa-spinner fa-spin" style={{fontSize:"36px"}}></i>} />


let COUNTER = 0
let SHOW_SPINNER = false
let MAX_DURATION = 10



export function startSpinner(flag) {
    SHOW_SPINNER = flag
}

export function LoadingSpinner() {
    const [showSpinner, setShowSpinner] = useState(true)

    useTickTok(500, (x) => {
        if (SHOW_SPINNER) {
            COUNTER += 1

            if (showSpinner === false) {
                setShowSpinner(true)
            }

            if (COUNTER > 8*2) {
                SHOW_SPINNER = false
                COUNTER = 0
                setShowSpinner(false)
            }
        } else {
            COUNTER = 0
            if (showSpinner === true) {
                setShowSpinner(false)
            }
        }
    })

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (showSpinner === true) {
    //             COUNTER += 1
    //             konsole.log(`COUNTER == ${COUNTER}`)
    //         }

    //         if (SHOW_SPINNER === true) {
    //             if (COUNTER > MAX_DURATION && showSpinner === true) {
    //                 SHOW_SPINNER = false
    //                 COUNTER = 0
    //                 setShowSpinner(false)

    //             } else if (showSpinner === false) {
    //                 setShowSpinner(true)
    //                 COUNTER = 0
    //             }


    //         } else {
    //             if (showSpinner === true) {
    //                 setShowSpinner(false)
    //                 COUNTER = 0
    //             }
    //         }



    //     }, 1000)

    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])

    return (
        <>
            <div style={{ zIndex: 5000, marginTop: "-5px" }}>
                {/* <Spin  size="default" spinning={isSpinnerVisible}></Spin> */}
                {/* <Spin  size="default" spinning={isSpinnerVisible}></Spin> */}
                <Spin indicator={<SpinnerIcon />} size="default" spinning={showSpinner}></Spin>
                {/* <Spin delay={3000} indicator={fa_spinner} size="default"></Spin> */}
            </div>
        </>
    )
}