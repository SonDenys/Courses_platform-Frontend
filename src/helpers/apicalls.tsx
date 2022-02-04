import axios from "axios";
import konsole from "../konsole";
import { BACKEND_URL } from "../params";
import { config_json, prepare_query } from "./utils";
// import { course_idState } from "../../../_GlobalStates/globalState/index";
import { useRecoilState } from "recoil";
import { result } from "lodash";

export async function create_course({ name, category, description }) {
  const query = prepare_query({
    name,
    category,
    description,
  });
  // const url = "/api/v1.0/create_course";

  try {
    const result = await axios.post(
      `${BACKEND_URL}/api/v1.0/create_course`,
      query,
      config_json
    );
    // console.log("result data = = =>", result.data);
    // console.log("course_id = = =>", JSON.stringify(result.data.data._id));

    if (!result.data) {
      return;
    }

    if (result && result.data) {
      return result.data;
    }
  } catch (e) {
    konsole.log(e);
  }
  return [];
}

export async function get_courses({ _id }) {
  const query: any = prepare_query(
    {
      _id,
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
  return [];
}

export async function update_course({ _id, name, category, description }) {
  const query = prepare_query({
    _id,
    name,
    category,
    description,
  });

  try {
    const result = await axios.post(
      `${BACKEND_URL}/api/v1.0/update_course`,
      query,
      config_json
    );

    if (!result.data) {
      return;
    }

    if (result && result.data) {
      return result.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function delete_course({ _id }) {
  const query = prepare_query({
    _id,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/delete_course`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function create_chapter({ course_id, name, description }) {
  const query = prepare_query({
    course_id,
    name,
    description,
    index: 0,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/create_chapter`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function get_chapters({ course_id }) {
  const query = prepare_query({
    course_id,
  });

  try {
    const result = await axios.post(
      `${BACKEND_URL}/api/v1.0/get_chapters${query}`
    );

    if (!result) {
      return;
    }

    if (result && result.data) {
      return result.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function update_chapter({ _id, course_id, name, description }) {
  const query = prepare_query({
    _id,
    course_id,
    name,
    description,
    index: 0,
  });

  const response = await axios.post(
    `${BACKEND_URL}/api/v1.0/update_chapter`,
    query,
    config_json
  );

  if (!response) {
    return;
  }

  if (response && response.data) {
    return response.data;
  }

  return [];
}

export async function delete_chapter({ _id, course_id }) {
  const query = prepare_query({
    _id,
    course_id,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/delete_chapter`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function create_section({
  chapter_id,
  course_id,
  name,
  description,
}) {
  const query = prepare_query({
    chapter_id,
    course_id,
    name,
    description,
    index: 0,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/create_section`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function get_sections({ course_id, chapter_id }) {
  const query = prepare_query({
    course_id,
    chapter_id,
  });

  try {
    const result = await axios.post(
      `${BACKEND_URL}/api/v1.0/get_sections${query}`
    );

    if (!result) {
      return;
    }

    if (result && result.data) {
      return result.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function update_section({
  _id,
  course_id,
  chapter_id,
  name,
  description,
}) {
  const query = prepare_query({
    _id,
    course_id,
    chapter_id,
    name,
    description,
    index: 0,
  });

  const response = await axios.post(
    `${BACKEND_URL}/api/v1.0/update_section`,
    query,
    config_json
  );

  if (!response) {
    return;
  }

  if (response && response.data) {
    return response.data;
  }

  return [];
}

export async function delete_section({ _id, course_id, chapter_id }) {
  const query = prepare_query({
    _id,
    course_id,
    chapter_id,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/delete_section`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function create_subsection({
  course_id,
  chapter_id,
  section_id,
  name,
  description,
}) {
  const query = prepare_query({
    course_id,
    chapter_id,
    section_id,
    name,
    description,
    index: 0,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/create_subsection`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function get_subsections({ course_id, chapter_id, section_id }) {
  const query = prepare_query({
    course_id,
    chapter_id,
    section_id,
  });

  try {
    const result = await axios.post(
      `${BACKEND_URL}/api/v1.0/get_subsections${query}`
    );

    if (!result) {
      return;
    }

    if (result && result.data) {
      return result.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function update_subsection({
  _id,
  course_id,
  chapter_id,
  section_id,
  name,
  description,
}) {
  const query = prepare_query({
    _id,
    course_id,
    chapter_id,
    section_id,
    name,
    description,
    index: 0,
  });

  const response = await axios.post(
    `${BACKEND_URL}/api/v1.0/update_subsection`,
    query,
    config_json
  );

  if (!response) {
    return;
  }

  if (response && response.data) {
    return response.data;
  }

  return [];
}

export async function delete_subsection({
  _id,
  course_id,
  chapter_id,
  section_id,
}) {
  const query = prepare_query({
    _id,
    course_id,
    chapter_id,
    section_id,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/delete_subsection`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function add_user_to_course({
  course_id,
  user_id,
  organization_id,
  role,
  start_time,
  end_time,
}) {
  const query = prepare_query({
    course_id,
    user_id,
    organization_id,
    role,
    start_time,
    end_time,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/add_user_to_course`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function remove_user_from_course({
  course_id,
  user_id,
  organization_id,
}) {
  const query = prepare_query({
    course_id,
    user_id,
    organization_id,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/remove_user_from_course`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function get_courses_of_user({ user_id, organization_id }) {
  const query: any = prepare_query(
    {
      user_id,
      organization_id,
    },
    true
  );

  try {
    const response: any = await axios.get(
      `${BACKEND_URL}/api/v1.0/get_courses_of_user${query}`
    );

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function get_users_of_course({ course_id, organization_id }) {
  const query: any = prepare_query(
    {
      course_id,
      organization_id,
    },
    true
  );

  try {
    const response: any = await axios.get(
      `${BACKEND_URL}/api/v1.0/get_users_of_course${query}`
    );

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function add_organization_to_course({
  course_id,
  organization_id,
  start_time,
  end_time,
}) {
  const query = prepare_query({
    course_id,
    organization_id,
    start_time,
    end_time,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/add_organization_to_course`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function remove_organization_from_course({
  user_id,
  course_id,
  organization_id,
}) {
  const query = prepare_query({
    user_id,
    course_id,
    organization_id,
  });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1.0/remove_organization_from_course`,
      query,
      config_json
    );

    if (!response) {
      return;
    }

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    konsole.log(error);
  }
  return [];
}

export async function get_courses_of_organization({ organization_id }) {
  const query: any = prepare_query(
    {
      organization_id,
    },
    true
  );

  try {
    const response: any = await axios.get(
      `${BACKEND_URL}/api/v1.0/get_courses_of_organization${query}`
    );

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function get_organizations_of_course({ course_id }) {
  const query: any = prepare_query(
    {
      course_id,
    },
    true
  );

  try {
    const response: any = await axios.get(
      `${BACKEND_URL}/api/v1.0/get_organizations_of_course${query}`
    );

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}
