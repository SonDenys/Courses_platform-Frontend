import { useParams } from "react-router-dom";








export default function AdminHome() {
    const { id } = useParams();

    return (
        <>
            <div>
                <h1>Admin Home {id}</h1>
                <p>
                    This is the Admin Home {id}
                </p>
            </div>
        </>
    );
}