import React, { useState } from "react";

const FormBuilder = ({ formFields, onFormUpdate }) => {
  const [addNewField, setAddNewField] = useState(false);
  const [errors, setErrors] = useState({});
  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    options: [],
    max_length: "",
    required: false,
  });

  const addField = () => {
    if (validateForm()) {
      onFormUpdate([...formFields, newField]);
      setNewField({ label: "", type: "text", options: [] });
      setAddNewField(!addNewField);
    }
  };

  const handleClose = () => {
    setNewField({ label: "", type: "text", options: [] });
    setAddNewField(!addNewField);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newField.label.trim()) {
      newErrors.label = "This field is Required";
    }

    if (!newField.type.trim()) {
      newErrors.type = "This field is Required";
    }

    if (
      ["dropdown", "checkbox", "radio"].includes(newField.type) &&
      newField.options.length === 0
    ) {
      newErrors.options = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="mx-6 mt-10">
      {addNewField ? (
        <div className={`border shadow-lg p-5 rounded-lg mt-5`}>
          <div
            className="w-6 h-6 rounded-sm text-center border border-gray-500 hover:cursor-pointer ml-auto"
            onClick={handleClose}
          >
            X
          </div>

          <div className="m-4 block">
            <div className="ml-5">
              Label <span className=" text-red-600">*</span>
            </div>
            <input
              className={`border my-2 w-80 h-10 text-left rounded-3xl px-4 ${
                errors.label ? "border-2 border-rose-600" : ""
              }`}
              type="text"
              id={newField.label}
              value={newField.label}
              onChange={(e) =>
                setNewField({ ...newField, label: e.target.value })
              }
            />
            {errors.label && (
              <p className="text-red-500 text-sm mt-1 ml-3">{errors.label}</p>
            )}
          </div>
          <div className="m-4">
            <div className="ml-5">
              Field Type: <span className=" text-red-600">*</span>
            </div>
            <select
              className="border w-52 h-10 text-left my-2 rounded-3xl px-2"
              value={newField.type}
              onChange={(e) =>
                setNewField({ ...newField, type: e.target.value })
              }
            >
              <option value="text">Text Input</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="textarea">Text Area</option>
              <option value="dropdown">Dropdown</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio Button</option>
            </select>
          </div>

          {newField.type === "dropdown" && (
            <div className="m-4">
              <div className="ml-5">
                Options (comma-separated){" "}
                <span className=" text-red-600">*</span>
              </div>
              <input
                type="text"
                className={`border w-80 h-10 text-left my-2 rounded-3xl px-2 ${
                  errors.options ? "border-2 border-rose-600" : ""
                }`}
                value={newField.options.join(",")}
                onChange={(e) =>
                  setNewField({
                    ...newField,
                    options: e.target.value.split(","),
                  })
                }
              />
              {errors.options && (
                <p className="text-red-500 text-sm mt-1 ml-3">
                  {errors.options}
                </p>
              )}
            </div>
          )}

          {newField.type === "checkbox" && (
            <div className="m-4">
              <div className="ml-5">
                Options (comma-separated)
                <span className=" text-red-600">*</span>
              </div>
              <div className="ml-4 my-3 flex">
                {newField.options.map((option, index) => (
                  <div key={index} className="ml-4">
                    <input
                      type="checkbox"
                      id={`checkbox_${index}`}
                      name={`checkbox_${index}`}
                      value={option}
                    />
                    <label className="ml-2" htmlFor={`checkbox_${index}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <input
                type="text"
                className={`border w-80 h-10 text-left my-2 rounded-3xl px-2 ${
                  errors.options ? "border-2 border-rose-600" : ""
                }`}
                placeholder="Enter checkbox options (comma-separated)"
                value={newField.options.join(",")}
                onChange={(e) =>
                  setNewField({
                    ...newField,
                    options: e.target.value.split(","),
                  })
                }
              />
              {errors.options && (
                <p className="text-red-500 text-sm mt-1  ml-3">
                  {errors.options}
                </p>
              )}
            </div>
          )}

          {newField.type === "radio" && (
            <div className="m-4">
              <div className="ml-5">
                Options (comma-separated)
                <span className=" text-red-600">*</span>
              </div>
              <div className="ml-4 my-3 flex">
                {newField.options.map((option, index) => (
                  <div key={index} className="ml-4">
                    <input
                      type="radio"
                      id={`radio_${index}`}
                      name="radioGroup"
                      value={option}
                    />
                    <label className="ml-2" htmlFor={`radio_${index}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <input
                type="text"
                className={`border w-80 h-10 text-left my-2 rounded-3xl px-2 ${
                  errors.options ? "border-2 border-rose-600" : ""
                }`}
                placeholder="Enter radio options (comma-separated)"
                value={newField.options.join(",")}
                onChange={(e) =>
                  setNewField({
                    ...newField,
                    options: e.target.value.split(","),
                  })
                }
              />
              {errors.options && (
                <p className="text-red-500 text-sm mt-1 ml-3">
                  {errors.options}
                </p>
              )}
            </div>
          )}

          {(newField.type === "text" || newField.type === "textarea") && (
            <div className="m-4 block">
              <div className="ml-5">Maximum length</div>
              <input
                className={`border my-2 w-80 h-10 text-left rounded-3xl px-4`}
                type="number"
                id="max_length"
                value={newField.max_length}
                onChange={(e) =>
                  setNewField({ ...newField, max_length: e.target.value })
                }
              />
            </div>
          )}

          <div className="ml-10">
            <input
              type="checkbox"
              id="required"
              name="required"
              value={newField.required}
              checked={newField.required}
              onChange={(e) =>
                setNewField({ ...newField, required: e.target.checked })
              }
            />
            <label className="mx-2">Required</label>
          </div>

          <div className="w-40 m-auto text-center">
            <button
              className="border border-green-500 bg-green-600 text-white p-2 rounded-md"
              onClick={addField}
            >
              Add Field
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <button
            className="border border-gray-500 p-2 rounded-lg"
            onClick={() => setAddNewField(!addNewField)}
          >
            Add new Field
          </button>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
