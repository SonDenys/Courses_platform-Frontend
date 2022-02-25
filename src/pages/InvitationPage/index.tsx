import { useLocation } from "react-router-dom";
import SimpleCentered from "../../components/CTA/SimpleCentered";
import SimpleOverlapImageCTA from "../../components/ui/SimpleOverlapImageCTA";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function InvitationPage() {
  // get query paramaters from the URL thanks to the function useQuery() and useLocation().search above

  const query = useQuery();
  //   const id = query.get("id");
  //   alert(`${query}`);
  const admin_id: string = query.get("ai") || "";
  const organization_id: string = query.get("oi") || "";
  const email_id: string = query.get("e") || "";
  const student_id: string = query.get("s") || "";
  const code: string = query.get("c") || "";

  console.log("admin_id : ", admin_id);
  console.log("organization_id :", organization_id);
  console.log("email_id, ", email_id);
  console.log("student_id :", student_id);
  console.log("code : ", code);

  // get the datas of the user inside the localStorage
  //   const payload = localStorage.getItem("payload") as any;
  // parse the JSON in order to use it
  //   const parsePayload = JSON.parse(payload);
  //   console.log(`test parsePayload==> ${JSON.stringify(parsePayload)}`);

  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //       Authorization: `Bearer ${parsePayload.access_token}`,
  //     },
  //   };

  // const response: any = await axios.get(
  //   `/api/v1.0/get_file_chunks_1${query}`
  // );
  // console.log("getFileChunks_1 response ===>", response);

  return (
    <div className="">
      <div>Hello</div>
      <div>ai: {admin_id} </div>
      <div>oi: {organization_id} </div>
      <div>e: {email_id} </div>
      <div>s: {student_id}</div>
      <div>c: {code} </div>

      <SimpleCentered
        title1="Welcome to Aeonx Academy"
        button1_text="Get Started"
      />
    </div>
  );
}
