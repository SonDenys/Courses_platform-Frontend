import { useState } from "react";
import ReactDOM from "react-dom";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";

/*
 * Simple editor component that takes placeholder text as a prop
 */
export function Editor(props) {
  const [editorHtml, setEditorHtml] = useState("");
  const [theme, setTheme] = useState("snow");

  // constructor (props) {
  //   super(props)
  //   this.state = { editorHtml: '', theme: 'snow' }
  //   this.handleChange = this.handleChange.bind(this)
  // }

  const handleChange = (html) => {
    // this.setState({ editorHtml: html });
    setEditorHtml(html);
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === "core") newTheme = null;
    //   this.setState({ theme: newTheme })
    setTheme(newTheme);
  };

  return (
    <div>
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={".app"}
        placeholder={props.placeholder}
      />
      <div className="themeSwitcher">
        <label>Theme </label>
        <select onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="snow">Snow</option>
          <option value="bubble">Bubble</option>
          <option value="core">Core</option>
        </select>
      </div>
    </div>
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
};

/*
 * Render component on page
 */
ReactDOM.render(
  <Editor placeholder={"Write something..."} />,
  document.querySelector(".app")
);
