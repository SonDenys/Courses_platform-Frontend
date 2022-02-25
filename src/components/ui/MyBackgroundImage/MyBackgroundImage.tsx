export interface MyBackgroundImageProps {
  imageUrl?: string;
  backgroundColorImage?: string;
  rounded?: string;
}

const MyBackgroundImage = (props: MyBackgroundImageProps) => {
  const backgroundColorImage = props.backgroundColorImage || "bg-indigo-700";
  const imageUrl =
    props.imageUrl ||
    "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100";
  const rounded = props.rounded || "rounded-none";

  return (
    <div className="absolute inset-0">
      {props.imageUrl && (
        <img
          className={`h-full w-full object-cover object-center ${rounded}`}
          src={`${imageUrl}`}
          alt="People working on laptops"
        />
      )}
      {!props.imageUrl && (
        <img
          className="h-full w-full object-cover object-center"
          src={`${imageUrl}`}
          alt="People working on laptops"
        />
      )}
      <div
        className={`absolute inset-0 ${backgroundColorImage} mix-blend-multiply ${rounded} `}
      />
    </div>
  );
};

export default MyBackgroundImage;
