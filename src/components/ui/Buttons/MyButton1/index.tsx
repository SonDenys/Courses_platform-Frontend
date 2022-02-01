export interface MyButtonProps {
  name: string;
  textColor?: string;
  backgroundColor?: string;
  onClick?: (value: any) => void;
}

export default function MyButton1(props: MyButtonProps) {
  const textColor = props.textColor || "text-white";
  const backgroundColor = props.backgroundColor || "bg-indigo-600";

  return (
    <a
      onClick={(e) => {
        if (props.onClick) {
          e.preventDefault();
          props.onClick(props.name);
          return false;
        }
      }}
      href="#"
      className={`block w-full py-3 px-4 rounded-md shadow hover:opacity-70 ${backgroundColor} ${textColor} font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900`}
      // className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${textColor}  ${backgroundColor}  hover:bg-indigo-700 hover:brightness-75`}
    >
      {props.name}
    </a>
  );
}
