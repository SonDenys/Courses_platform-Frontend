import axios from "axios";
import konsole from "../../../konsole";
import { BACKEND_URL } from "../../../params";
import { config_json, prepare_query } from "./utils";
import { course_idState } from "../../../_GlobalStates/globalState/index";
import { useRecoilState } from "recoil";

export async function create_course(
  { name, category, description },
  callback?
) {
  const query = prepare_query({
    name: category,
    description,
  });
  const url = "/api/v1.0/create_course";

  try {
    const result = await axios.post(`${BACKEND_URL}${url}`, query, config_json);
    console.log("result data = = =>", result.data);
    console.log("course_id = = =>", JSON.stringify(result.data.data._id));

    if (!result.data) {
      return;
    }

    callback && callback(result.data.data);

    if (result && result.data) {
      return result.data;
    }
  } catch (e) {
    konsole.log(e);
    callback && callback(e);
  }
  return [];
}

export async function Get_courses() {
  const [course_id, setCourse_id] = useRecoilState(course_idState);
  const query: any = prepare_query(
    {
      _id: course_id,
      do_list: false,
    },
    true
  );

  try {
    const response: any = await axios.get(
      `${BACKEND_URL}/api/v1.0/get_courses${query}`
    );

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
