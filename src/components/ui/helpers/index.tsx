import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { resolve } from "node:path/win32";
import {
  delete_chapter,
  delete_course,
  delete_section,
  delete_subsection,
} from "../../../pages/AdminDashboard/helpers/apicalls";

const { confirm } = Modal;

export interface showDeleteConfirmProps {
  title: string;
  icon?: any;
  content: string;
  function?: Function;
  course_id?: any;
  chapter_id?: any;
  section_id?: any;
  subsection_id?: any;
}

export function showDeleteCourseConfirm(props: showDeleteConfirmProps) {
  const title = props.title || "Do you want to delete these items?";
  const icon = props.icon || <ExclamationCircleOutlined />;
  const content =
    props.content ||
    "When clicked the OK button, this dialog will be closed after 1 second";

  const handleOnOk: any = async () => {
    try {
      const response = await delete_course({ _id: props.course_id });
      if (!response) {
        console.log("Delete course failed");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      console.log("there is an error on the delete_course api call");
    }
  };

  confirm({
    title: `${title}`,
    icon: icon,
    content: content,

    onOk: handleOnOk,
    onCancel() {},
  });
}

export function showDeleteChapterConfirm(props: showDeleteConfirmProps) {
  const title = props.title || "Do you want to delete these items?";
  const icon = props.icon || <ExclamationCircleOutlined />;
  const content =
    props.content ||
    "When clicked the OK button, this dialog will be closed after 1 second";

  const handleOnOk: any = async () => {
    try {
      const response = await delete_chapter({
        _id: props.chapter_id,
        course_id: props.course_id,
      });
      if (!response) {
        console.log("Delete chapter failed");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      console.log("there is an error on the delete_chapter api call");
    }
  };

  confirm({
    title: `${title}`,
    icon: icon,
    content: content,

    onOk: handleOnOk,
    onCancel() {},
  });
}

export function showDeleteSectionConfirm(props: showDeleteConfirmProps) {
  const title = props.title || "Do you want to delete these items?";
  const icon = props.icon || <ExclamationCircleOutlined />;
  const content =
    props.content ||
    "When clicked the OK button, this dialog will be closed after 1 second";

  const handleOnOk: any = async () => {
    try {
      const response = await delete_section({
        _id: props.section_id,
        course_id: props.course_id,
        chapter_id: props.chapter_id,
      });
      if (!response) {
        console.log("Delete section failed");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      console.log("there is an error on the delete_section api call");
    }
  };

  confirm({
    title: `${title}`,
    icon: icon,
    content: content,

    onOk: handleOnOk,
    onCancel() {},
  });
}

export function showDeleteSubsectionConfirm(props: showDeleteConfirmProps) {
  const title = props.title || "Do you want to delete these items?";
  const icon = props.icon || <ExclamationCircleOutlined />;
  const content =
    props.content ||
    "When clicked the OK button, this dialog will be closed after 1 second";

  const handleOnOk: any = async () => {
    try {
      const response = await delete_subsection({
        _id: props.subsection_id,
        course_id: props.course_id,
        chapter_id: props.chapter_id,
        section_id: props.section_id,
      });
      if (!response) {
        console.log("Delete subsection failed");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      console.log("there is an error on the delete_subsection api call");
    }
  };

  confirm({
    title: `${title}`,
    icon: icon,
    content: content,

    onOk: handleOnOk,
    onCancel() {},
  });
}
