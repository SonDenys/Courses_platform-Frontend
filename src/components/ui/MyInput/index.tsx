import classnames from "classnames";
import { useRecoilState } from "recoil";
import { emailStateReceiver } from "../../../_GlobalStates/globalState";

export interface MyInputProps {
  value?: string;
  defaultValue?: string;
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
  onFinish?: (value: any) => void;
  clear?: boolean;
  width?: string;
}

export default function MyInput(props: MyInputProps) {
  const defaultValue = props.defaultValue || "";
  const type = props.type || "text";
  const name = props.name || "name";
  const width = props.width || "w-80";

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  const handleOnClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    if (props.onFinish) {
      props.onFinish(event.target.value);
    }
    if (props.clear) {
      event.target.value = "";
    }
  };

  return (
    <div className={classnames(`${width}`, "max-w-lg")}>
      {props.label && (
        <label htmlFor={name} className="sr-only">
          {props.label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md h-10"
        placeholder={props.placeholder}
        onChange={handleOnChange}
        onClick={handleOnClick as any}
        value={props.value}
      />
    </div>
  );
}
