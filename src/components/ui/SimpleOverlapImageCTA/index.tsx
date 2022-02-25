import MyBackgroundImage from "../MyBackgroundImage/MyBackgroundImage";

export interface SplitOverlapImageCTAProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  aboveTitleTextColor?: string;
  titleTextColor?: string;
  subtitleTextColor?: string;
  backgroundColor?: string;
  imageBackgroundColor?: string;
  buttonText?: string;
  buttonTextColor?: string;
  onButtonClick?: any;
  buttonBackgroundColor?: string;
  showExternalLinkIcon?: boolean;
  rightSideImage?: boolean;
  dottedGridColor?: string;
  rounded?: string;
}

export default function SimpleOverlapImageCTA(
  props: SplitOverlapImageCTAProps
) {
  const backgroundColor = props.backgroundColor || "bg-indigo-600";

  const imageUrl =
    props.imageUrl ||
    "https://images.unsplash.com/photo-1507207611509-ec012433ff52?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80";
  const titleTextColor = props.titleTextColor || "text-white";
  const subtitleTextColor = props.subtitleTextColor || "text-white";
  const buttonTextColor = props.buttonTextColor || "text-yellow-700";
  const buttonBackgroundColor = props.buttonBackgroundColor || "bg-white";
  const rounded = props.rounded || "rounded-3xl";

  return (
    <div className={`relative py-16 bg-white`}>
      <div
        className="hidden absolute top-0 inset-x-0 h-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />
      <div
        className={`max-w-7xl mx-auto ${backgroundColor}  lg:bg-transparent lg:px-8`}
      >
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
            <div
              className="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden"
              aria-hidden="true"
            />
            <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                {imageUrl && (
                  <MyBackgroundImage
                    backgroundColorImage="bg-green-700"
                    imageUrl="https://images.pexels.com/photos/4049991/pexels-photo-4049991.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className={`relative ${backgroundColor} lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center`}
          >
            <div
              className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block"
              aria-hidden="true"
            >
              <div className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0">
                <DottedGridImage />
              </div>
              <div className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2">
                <DottedGridImage />
              </div>
            </div>
            <div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
              {props.title && (
                <h2
                  className={`text-3xl font-extrabold ${titleTextColor}`}
                  id="join-heading"
                >
                  {props.title}
                </h2>
              )}
              <p className={`text-lg ${subtitleTextColor} text-white`}>
                Varius facilisi mauris sed sit. Non sed et duis dui leo,
                vulputate id malesuada non. Cras aliquet purus dui laoreet diam
                sed lacus, fames.
              </p>
              {props.buttonText && (
                <a
                  className={`block w-full py-3 px-5 text-center ${buttonBackgroundColor} border border-transparent rounded-md shadow-md text-base font-medium ${buttonTextColor}  hover:bg-gray-50 sm:inline-block sm:w-auto`}
                  href="#"
                >
                  {props.buttonText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DottedGridImage(props: SplitOverlapImageCTAProps) {
  const dottedGridColor = props.dottedGridColor || "text-red-500";
  return (
    <>
      <svg
        // className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x={0}
              y={0}
              width={4}
              height={4}
              className={`${dottedGridColor}`}
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width={404}
          height={384}
          fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
        />
      </svg>
    </>
  );
}
