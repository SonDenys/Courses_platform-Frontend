import React, { useState } from "react";
import { Modal, Button } from "antd";
import { any } from "prop-types";

export interface MyModalAntdesignProps {
  openModal?: any;
  onConfirm?: any;
  onCancel?: any;
  backgroundColor?: string;
  modal_backgroundColor?: string;
  text1?: string;
  text2?: string;
  text3?: any;
  text1Color?: string;
  text2Color?: string;
  validation?: boolean;
  validation_textColor?: string;
  validation_backgroundColor?: string;
  buttonX?: boolean;
  buttonX_close?: any;
  button1_text?: string;
  button1_textColor?: string;
  button1_close?: any;
  button1_backgroundColor?: string;
  hover_button1_backgroundColor?: string;
  onButton1Click?: any;
  button2_text?: string;
  button2_textColor?: string;
  button2_close?: any;
  button2_backgroundColor?: string;
  hover_button2_backgroundColor?: string;
  onButton2Click?: any;
  button3_text?: string;
  button3_textColor?: string;
  button3_backgroundColor?: string;
  onButton3Click?: any;
  open?: Function;
  heightScreen?: string;
  widthFull?: string;
  widthScreen?: string;
  organizationToSelect?: boolean;
  datePicker1?: boolean;
  datePicker2?: boolean;
}

const MyModalAntdesign = (props: MyModalAntdesignProps) => {
  const backgroundColor = props.backgroundColor || "bg-gray-200";
  const modal_backgroundColor = props.modal_backgroundColor || "bg-white";
  const text1Color = props.text1Color || "text-gray-900";
  const text2Color = props.text2Color || "text-gray-500";
  const validation_textColor = props.validation_textColor || "text-green-600";
  const validation_backgroundColor =
    props.validation_backgroundColor || "bg-green-100";
  const button1_backgroundColor =
    props.button1_backgroundColor || "bg-blue-900";
  const hover_button1_backgroundColor =
    props.hover_button1_backgroundColor || "bg-blue-700";
  const button2_backgroundColor = props.button2_backgroundColor || "bg-white";
  const hover_button2_backgroundColor =
    props.hover_button2_backgroundColor || "bg-gray-100";

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen w-screen">
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Preview"
        // visible={props.openModal}
        visible={isOpen}
        onOk={props.onConfirm}
        onCancel={props.onCancel}
        className=""
      >
        <h1 className={`text-lg leading-6 font-medium ${text1Color}`}>
          {props.text1}
        </h1>
        <p className={`text-sm ${text2Color}`}>{props.text2}</p>
        <p className={`text-sm ${text2Color}`}>{props.text3}</p>
      </Modal>
    </div>
  );
};

export default MyModalAntdesign;
