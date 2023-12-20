import React from "react";
import FormsSSR from "./Forms";
import DocumentTemplate from "./Forms/documentTemplate";

const ExtendedComponent = ({
  title,
  formData,
  setFormData,
  field,
  doc,
  extendedID,
}) => {
  return (
    <div>
      <FormsSSR
        title={title}
        formData={formData}
        setFormData={setFormData}
        field={field}
      />
      {doc && (
        <DocumentTemplate
          formData={formData}
          setFormData={setFormData}
          field={field}
          doc={doc}
          extendedID={extendedID}
        />
      )}
    </div>
  );
};

export default ExtendedComponent;
