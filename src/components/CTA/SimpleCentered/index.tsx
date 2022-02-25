export interface SimpleCenteredProps {
  title1: string;
  title2?: string;
  subtitle1?: string;
  subtitle2?: string;
  button1_text?: string;
  button1_textColor?: string;
  button1_backgroundColor?: string;
  onButton1Click?: any;
  button2_text?: string;
  button2_textColor?: string;
  button2_backgroundColor?: string;
  onButton2Click?: any;
  button3_text?: string;
  button3_textColor?: string;
  button3_backgroundColor?: string;
  onButton3Click?: any;
  isBranded?: boolean;
  backgroundColor?: string;
  titleTextColor?: string;
  subtitleTextColor?: string;
}

export default function SimpleCentered(props: SimpleCenteredProps) {
  const titleTextColor = props.titleTextColor || "text-white";
  const subtitleTextColor = props.subtitleTextColor || "text-indigo-200";
  const subtitle2_TextColor = props.subtitleTextColor || "text-indigo-200";
  const backgroundColor = props.backgroundColor || "bg-indigo-700";
  const button1_textColor = props.button1_textColor || "text-black";
  const button2_textColor = props.button2_textColor || "text-black";
  const button3_textColor = props.button3_textColor || "text-black";
  const button1_backgroundColor = props.button1_backgroundColor || "bg-white";
  const button2_backgroundColor = props.button2_backgroundColor || "bg-white";
  const button3_backgroundColor = props.button3_backgroundColor || "bg-white";

  return (
    <div className={backgroundColor}>
      <div className="max-w-4xl mx-auto text-center pt-16 px-4 sm:px-6 lg:px-8">
        {props.subtitle1 && (
          <p className={`mt-4 text-lg leading-6 ${subtitleTextColor}`}>
            {props.subtitle1}
          </p>
        )}

        <h2 className={`text-2xl font-extrabold ${titleTextColor} sm:text-6xl`}>
          <span className="block">{props.title1}</span>
          {props.title2 && <span className="block">{props.title2}</span>}
        </h2>

        {props.subtitle2 && (
          <p className={`mt-4 text-md leading-6 ${subtitleTextColor}`}>
            {props.subtitle2}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            {props.button1_text && (
              <a
                onClick={props.onButton1Click}
                href="#"
                className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${button1_textColor} ${button1_backgroundColor} hover:bg-gray-200`}
              >
                {props.button1_text}
              </a>
            )}
          </div>
          <div className="ml-3 inline-flex">
            {props.button2_text && (
              <a
                onClick={props.onButton2Click}
                href="#"
                className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${button2_textColor} ${button2_backgroundColor} hover:bg-gray-200`}
              >
                {props.button2_text}
              </a>
            )}
          </div>
        </div>
        {props.button3_text && (
          <span
            onClick={props.onButton3Click}
            className={`mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${button3_textColor} ${button3_backgroundColor} hover:bg-gray-200 sm:w-auto`}
          >
            {props.button3_text}
          </span>
        )}
      </div>
      <div className="md:flex block justify-evenly md:p-16 p-0">
        <div>{/* <MyRadioList /> */}</div>
      </div>
    </div>
  );
}
