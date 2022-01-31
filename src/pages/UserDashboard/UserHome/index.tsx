import { useParams } from "react-router-dom";

export default function UserHome() {
  const { id } = useParams();

  return (
    <>
      <div>
        <h1>User Home {id}</h1>
        <p>This is the User Home {id}</p>
      </div>

      <div>
        <h1>Title course</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          vestibulum nunc elit, quis varius ante egestas eu. Vivamus at augue
          eget magna auctor scelerisque semper eget lacus. Ut semper, augue a
          egestas placerat, quam turpis ornare sem, sed rutrum quam sapien id
          diam.
        </p>
      </div>
    </>
  );
}
