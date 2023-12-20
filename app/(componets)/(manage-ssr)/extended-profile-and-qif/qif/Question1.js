"use client";
import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Question = ({ e, formData, setFormdata }) => {
  const configObject = {
    // Add your CKEditor configuration options here
  };

  return (
    <div className="p-4 mt-1">
      {/* <CKEditor
        editor={ClassicEditor}
        // data={formData[e][1]}
        className="h-full"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              "250px",
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFormdata((prevData) => {
            const updatedFormData = { ...prevData };
            updatedFormData[e][1] = data;
            return updatedFormData;
          });
        }}
        onBlur={(event, editor) => {
          // console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      /> */}
    </div>
  );
};

export default Question;
