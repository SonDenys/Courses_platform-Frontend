export interface MyButtonProps {
  name?: string;
  textColor?: string;
  backgroundColor?: string;
  width?: string;
  borderType?: string;
  borderWeight?: string;
  hover_borderColor?: string;
  hover_textColor?: string;
  hover_backgroundColor?: string;
  rounded?: string;
  focus_textColor?: string;
  focus_borderBottomColor?: string;
  onClick?: (value: any) => void;
}

export default function MyButton(props: MyButtonProps) {
  const textColor = props.textColor || "text-white";
  const backgroundColor = props.backgroundColor || "bg-indigo-600";
  const width = props.width || "w-auto";
  const borderType = props.borderType;
  const borderWeight = props.borderWeight;
  const hover_borderColor = props.hover_borderColor;
  const hover_textColor = props.hover_textColor;
  const hover_backgroundColor = props.hover_backgroundColor;
  const focus_textColor = props.focus_textColor;
  const focus_borderBottomColor = props.focus_borderBottomColor;
  const rounded = props.rounded || "rounded-md";

  return (
    <a
      type="submit"
      onClick={(e) => {
        if (props.onClick) {
          e.preventDefault();
          props.onClick(props.name);
          return false;
        }
      }}
      href="#"
      className={`${width} flex items-center justify-center px-10 py-2 ${focus_textColor} ${focus_borderBottomColor} focus:border-yellow-500 ${borderWeight} ${borderType} ${rounded} shadow-sm text-base font-medium ${textColor} ${backgroundColor} hover:${hover_borderColor} hover:${hover_textColor}  hover:${hover_backgroundColor}`}
      // className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${textColor}  ${backgroundColor}  hover:bg-indigo-700 hover:brightness-75`}
    >
      {props.name}
    </a>
  );
}
