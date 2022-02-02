import { Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

export const data = [
  {
    id: 1,
    chapter_nav: "Courses",
    url: "/admin/home/1",
  },
  {
    id: 2,
    chapter_nav: "Active Courses",
    url: "/admin/home/2",
  },
  {
    id: 3,
    chapter_nav: "Exercices",
    url: "/admin/home/3",
  },
  {
    id: 4,
    chapter_nav: "Students",
    url: "/admin/home/4",
  },
  {
    id: 5,
    chapter_nav: "Promotions",
    url: "/admin/home/5",
  },
];

// export const data1 = [
//   {
//     id: 1,
//     chapter_nav: "Courses",
//     url: "/admin/home/1",
//     menu_nav: [
//       {
//         name: "Html/CSS",
//         url: "/admin/home/1",
//         tag: "html/css",
//       },
//       {
//         name: "Javascript",
//         url: "/admin/home/2",
//         tag: "javascript",
//       },
//       {
//         name: "React",
//         url: "/admin/home/3",
//         tag: "javascript",
//       },
//       {
//         name: "Python",
//         url: "/admin/home/4",
//         tag: "python",
//       },
//       {
//         name: "MongoDB",
//         url: "/admin/home/5",
//         tag: "mongodb",
//       },
//     ],
//   },
//   {
//     id: 2,
//     chapter_nav: "Active Courses",
//     url: "/admin/home/2",
//     menu_nav: [
//       {
//         name: "Html/CSS",
//         url: "/admin/home/6",
//         tag: "html/css",
//       },
//       {
//         name: "Javascript",
//         url: "/admin/home/7",
//         tag: "javascript",
//       },
//       {
//         name: "React",
//         url: "/admin/home/8",
//         tag: "react",
//       },
//       {
//         name: "Python",
//         url: "/admin/home/9",
//         tag: "python",
//       },
//       {
//         name: "MongoDB",
//         url: "/admin/home/10",
//         tag: "mongodb",
//       },
//     ],
//   },
//   {
//     id: 3,
//     chapter_nav: "Exercices",
//     url: "/admin/home/3",
//     menu_nav: [
//       {
//         name: "Html/CSS",
//         url: "/admin/home/11",
//         tag: "html/css",
//       },
//       {
//         name: "Javascript",
//         url: "/admin/home/12",
//         tag: "javascript",
//       },
//       {
//         name: "React",
//         url: "/admin/home/13",
//         tag: "react",
//       },
//       {
//         name: "Python",
//         url: "/admin/home/14",
//         tag: "python",
//       },
//       {
//         name: "MongoDB",
//         url: "/admin/home/15",
//         tag: "mongodb",
//       },
//     ],
//   },
//   {
//     id: 4,
//     chapter_nav: "Students",
//     url: "/admin/home/4",
//     menu_nav: [
//       { name: "Students List", url: "/admin/home/16", tag: "student" },
//     ],
//   },
//   {
//     id: 5,
//     chapter_nav: "Promotions",
//     url: "/admin/home/5",
//     menu_nav: [
//       { name: "Promotions List", url: "/admin/home/17", tag: "promotion" },
//     ],
//   },
// ];

export const columns = [
  {
    title: "Courses name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
  },
  {
    title: "Chapter",
    dataIndex: "chapter",
    key: "chapter",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Modify</a>
        <a>Delete</a>
        <a>Activate</a>
        <a>Deactivate</a>
      </Space>
    ),
  },
];

export const table_data = [
  {
    key: "1",
    name: "Introduction",
    day: 1,
    chapter: 32,
    description: "What is html/css ?",
    tags: ["day1", "html/css"],
    url: "/admin/home/6",
  },
  {
    key: "2",
    day: 2,
    name: "Structure your project",
    chapter: 42,
    description: "Setup your editor",
    tags: ["day2", "html/css"],
    url: "/admin/home/7",
  },
  {
    key: "3",
    day: 3,
    name: "The div and the class",
    chapter: 32,
    description: "Struture of a webpage",
    tags: ["day3", "html/css"],
    url: "/admin/home/8",
  },
];
