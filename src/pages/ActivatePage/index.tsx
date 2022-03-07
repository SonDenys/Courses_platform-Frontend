import _ from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SimpleCentered from "../../components/CTA/SimpleCentered";
import SimpleOverlapImageCTA from "../../components/ui/SimpleOverlapImageCTA";
import { create_user } from "../../helpers";
import konsole from "../../konsole";
import { useMyToast } from "../../_GlobalStates/hooks";
import { assign_user_to_organization } from "../AdminDashboard/helpers/apicalls";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ActivatePage() {
  // get query paramaters from the URL thanks to the function useQuery() and useLocation().search above

  const query = useQuery();
  //   const id = query.get("id");
  //   alert(`${query}`);
  const user_id: any = query.get("ui") || "";
  const admin_id: any = query.get("ai") || "";
  const organization_id: any = query.get("oi") || "";
  const email_id: any = query.get("e") || "";
  const student_id: any = query.get("s") || "";
  const code: any = query.get("c") || "";

  console.log("user_id : ", user_id);
  console.log("admin_id : ", admin_id);
  console.log("organization_id :", organization_id);
  console.log("email_id, ", email_id);
  console.log("student_id :", student_id);
  console.log("code : ", code);

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [scopes, setScopes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toast = useMyToast();
  const navigate = useNavigate();

  const handleGetStarted = async (e: any) => {
    e.preventDefault();
    try {
      const result = await assign_user_to_organization({
        user_id,
        organization_id,
        code,
        email,
        scopes,
        admin_id,
      });

      if (!result) {
        console.log("The api call has not been reached");
      }
      console.log("result handleGetStarted", result);
    } catch (e) {
      konsole.error(`Could not signup ${e}`);
      toast.error(t("could_not_assign_user_to_organization"));
    }
  };

  return (
    <div className="min-h-screen bg-teal-100">
      {/* <div>
        <div>Hello</div>
        <div>ui: {user_id}</div>
        <div>ai: {admin_id} </div>
        <div>oi: {organization_id} </div>
        <div>e: {email_id} </div>
        <div>s: {student_id}</div>
        <div>c: {code} </div>
      </div> */}

      <SimpleCentered
        title1="Welcome to AeonX Academy"
        subtitle1="You can now login to the platform"
        subtitleTextColor="text-gray-700"
        backgroundColor="bg-none"
        titleTextColor="text-black"
        button1_text="Get Started"
        button1_backgroundColor="bg-teal-200"
        onButton1Click={handleGetStarted}
      />
    </div>
  );
}
