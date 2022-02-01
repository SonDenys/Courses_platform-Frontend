import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Modal } from "antd";

export interface ConfirmDialogProps {
    title?: string
    message: string
    okText: string
    cancelText: string
    onOk?: Function
    onCancel?: Function
}


export default function ConfirmDialog(props: ConfirmDialogProps) {
    const [isVisible, setIsVisible] = useState(true)

    const onOk = () => {
        setIsVisible(false)
        if(props.onOk){
            props.onOk()
        }
    }

    const onCancel = () => {
        setIsVisible(false)
        if(props.onCancel){
            props.onCancel()
        }
    }

    return (
        <Modal
            title={props.title}
            visible={isVisible}
            transitionName="fade"
            maskTransitionName="fade"
            onOk={onOk}
            onCancel={onCancel}
            okText={props.okText}
            cancelText={props.cancelText}
        >   
            <p>{props.message} </p>
        </Modal>
    )
};
