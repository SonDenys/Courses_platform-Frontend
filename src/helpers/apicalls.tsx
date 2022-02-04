import axios from "axios";
import konsole from "../konsole";
import { BACKEND_URL } from "../params";
import { config_json, prepare_query } from "./utils";

export async function create_course({ name, category, description }) {
  console.log("hello cklicked");
  const query = prepare_query({
    name: category,
    description,
  });

  try {
    const result = await axios.post(
      "https://aeolia-api.aeonx.ai/api/v1.0/create_course",
      query,
      config_json
    );
    if (result && result.data) {
      return result.data;
    }
  } catch (e) {
    konsole.log(e);
    // return (e.response.data)
  }
  return [];
}
