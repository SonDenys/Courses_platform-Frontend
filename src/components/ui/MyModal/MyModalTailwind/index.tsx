/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import ReactQuill from "react-quill";
import { formats, modules } from "../../../EditorToolbar";
import "react-quill/dist/quill.snow.css";
import OrganizationSelect from "../../../OrganizationSelect";
import DatePickerAntDesign from "../../../MyDatePicker/DatePickerAntDesign/index";
import DatePickerReact from "../../../MyDatePicker/DatePickerReact";
import MyInput from "../../MyInput/index";
import { emailStateReceiver } from "../../../../_GlobalStates/globalState";
import { useRecoilState } from "recoil";

export interface MyModalProps {
  backgroundColor?: string;
  modal_backgroundColor?: string;
  text1: string;
  text2?: string;
  content?: any;
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
  input1?: boolean;
  onChange_input1?: any;
  input2?: boolean;
  onChange_input2?: any;
}

export default function MyModal_Tailwind(props: MyModalProps) {
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

  const [open, setOpen] = useState(true);
  // const [emailReceiver, setEmailReceiver] = useRecoilState(emailStateReceiver);

  const cancelButtonRef = useRef(null);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={openModal}
        static={true}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={`fixed inset-0 ${backgroundColor} bg-opacity-75 transition-opacity`}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block align-bottom ${modal_backgroundColor} ${props.heightScreen} ${props.widthFull} rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6`}
            >
              <div>
                {props.validation && (
                  <div
                    className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${validation_backgroundColor}`}
                  >
                    <CheckIcon
                      className={`h-6 w-6 ${validation_textColor}`}
                      aria-hidden="true"
                    />
                  </div>
                )}
                {props.buttonX && (
                  <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4 cursor-pointer">
                    <XIcon
                      className="h-6 w-6"
                      onClick={props.buttonX_close}
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="mt-3 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className={`text-lg leading-6 font-medium ${text1Color}`}
                  >
                    {props.text1}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className={`text-sm ${text2Color}`}>{props.text2}</p>
                  </div>
                  <div className="mt-2">
                    <div
                      className={`text-sm ${text2Color}`}
                      dangerouslySetInnerHTML={{ __html: props.content }}
                    ></div>
                  </div>
                  <div className="mt-10">
                    {props.organizationToSelect && (
                      <OrganizationSelect
                        key={"header_000"}
                        // onChange={props.onChangeOrganization}
                        // readOnly={props.organizationReadOnly}
                      />
                    )}
                  </div>

                  {props.datePicker1 && (
                    <div className="m-10">
                      <DatePickerAntDesign />
                    </div>
                  )}

                  {props.datePicker2 && (
                    <div className="mt-10">
                      <DatePickerReact />
                    </div>
                  )}

                  {props.input1 && (
                    <div className="mb-3">
                      <MyInput
                        placeholder="Email Adress..."
                        onChange={props.onChange_input1}
                      />
                    </div>
                  )}

                  {props.input2 && (
                    <MyInput
                      placeholder="Scope..."
                      onChange={props.onChange_input2}
                    />
                  )}
                </div>
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                {props.button1_text && (
                  <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${button1_backgroundColor} text-base font-medium text-white hover:${hover_button1_backgroundColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm`}
                    onClick={props.button1_close}
                  >
                    {props.button1_text}
                  </button>
                )}
                {props.button2_text && (
                  <button
                    type="button"
                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 ${button2_backgroundColor} text-base font-medium text-gray-700 hover:${hover_button2_backgroundColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm`}
                    onClick={props.button2_close}
                    ref={cancelButtonRef}
                  >
                    {props.button2_text}
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
