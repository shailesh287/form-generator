import React, { useState } from "react";
import FormBuilder from "./FormBuilder";
import { useNavigate } from "react-router";

const Form = () => {
  const [formFields, setFormFields] = useState([
    {
      label: "Form Name",
      required: true,
      type: "text",
    },
  ]);
  const [inputData, setInputData] = useState({});
  const [checkboxData, setCheckboxData] = useState({});
  const [radioData, setRadioData] = useState({});
  const [dropdownData, setDropdownData] = useState([]);
  const navigate = useNavigate();

  const [error, setError] = useState({});

  const handleFormUpdate = (updatedFields) => {
    setFormFields(updatedFields);
  };

  const handleInputChange = (fieldIndex, value) => {
    setInputData((prevData) => {
      const updatedData = { ...prevData, [fieldIndex]: value };
      return updatedData;
    });
  };
  const handleDropdownChange = (fieldIndex, selectedValue) => {
    setDropdownData((prevData) => {
      const updatedData = [...prevData];
      updatedData[fieldIndex] = selectedValue;
      return updatedData;
    });
  };
  const handleCheckboxChange = (fieldIndex, i) => {
    setCheckboxData((prevData) => {
      const key = `${fieldIndex}_${i}`;
      const updatedData = { ...prevData, [key]: !prevData[key] };
      return updatedData;
    });
  };
  const handleRadioChange = (fieldIndex, optionIndex) => {
    setRadioData((prevData) => {
      const key = `${fieldIndex}`;
      const updatedData = { ...prevData, [key]: optionIndex };
      return updatedData;
    });
  };

  const removeField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const isFormValid = (formFields) => {
    let newError = {};

    for (const field of formFields) {
      if (field.required) {
        if (
          (field.type === "text" ||
            field.type === "email" ||
            field.type === "number" ||
            field.type === "textarea") &&
          (!field.value || field.value.trim() === "")
        ) {
          newError[field.label] = "This field is required.";
        } else if (field.type === "dropdown" && !field.selectedOption) {
          newError[field.label] = "Please select an option.";
        } else if (field.type === "checkbox") {
          if (field.options.every((option) => !option.checked)) {
            newError[field.label] = "Please select at least one option.";
          }
        } else if (field.type === "radio" && !field.selectedOptionIndex) {
          newError[field.label] = "Please select at least one option.";
        }
      }
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleSubmit = () => {
    const FormData = formFields.map((field, fieldIndex) => {
      if (field.type === "checkbox") {
        const updatedOptions = field.options.map((option, optionIndex) => ({
          option,
          checked: checkboxData[`${fieldIndex}_${optionIndex}`] || false,
        }));
        return { ...field, options: updatedOptions };
      } else if (field.type === "radio") {
        return { ...field, selectedOptionIndex: radioData[`${fieldIndex}`] };
      } else if (field.type === "dropdown") {
        return { ...field, selectedOption: dropdownData[`${fieldIndex}`] };
      } else if (
        field.type === "text" ||
        field.type === "email" ||
        field.type === "number" ||
        field.type === "textarea"
      ) {
        return { ...field, value: inputData[`${fieldIndex}`] };
      }
      return field;
    });
    console.log(FormData);
    const valid = isFormValid(FormData);
    if (valid) {
      const existingData = JSON.parse(localStorage.getItem("formData")) || [];
      const uniqueId = Date.now();
      const newEntry = { id: uniqueId, data: FormData };
      const combinedData = [...existingData, newEntry];
      localStorage.setItem("formData", JSON.stringify(combinedData));
      navigate("/");
    }
  };
  return (
    <div className="mx-6 mt-10  rounded-sm p-4">
      <form onSubmit={(e) => e.preventDefault()}>
        {formFields.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className="m-6 flex justify-between items-center"
          >
            <div>
              <label className="block" htmlFor={field.label}>
                {field.label}{" "}
                {field.required && <span className="text-red-600">*</span>}
              </label>
              {(field.type === "text" ||
                field.type === "email" ||
                field.type === "number") && (
                <>
                  <input
                    className="border w-80 h-10 text-left rounded-lg mt-3 px-2"
                    type={field.type}
                    onChange={(e) =>
                      handleInputChange(fieldIndex, e.target.value)
                    }
                  />
                  {error[field.label] && (
                    <p className="text-red-500 mt-2">{error[field.label]}</p>
                  )}
                </>
              )}
              {field.type === "textarea" && (
                <>
                  <textarea
                    className="border w-80 h-20 text-left ml-3 px-2"
                    onChange={(e) =>
                      handleInputChange(fieldIndex, e.target.value)
                    }
                  />
                  {error[field.label] && (
                    <p className="text-red-500 mt-2">{error[field.label]}</p>
                  )}
                </>
              )}
              {field.type === "dropdown" && (
                <>
                  <select
                    className="border w-52 h-10 text-left my-2 rounded-lg px-2"
                    value={dropdownData[fieldIndex] || ""}
                    onChange={(e) =>
                      handleDropdownChange(fieldIndex, e.target.value)
                    }
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {error[field.label] && (
                    <p className="text-red-500 mt-2">{error[field.label]}</p>
                  )}
                </>
              )}
              {field.type === "checkbox" && (
                <>
                  <div className="mt-3">
                    {field.options.map((option, i) => (
                      <>
                        <div key={i}>
                          <input
                            className=" w-4 h-4  mx-3 "
                            type="checkbox"
                            id={`checkbox_${fieldIndex}_${i}`}
                            name={`checkbox_${fieldIndex}_${i}`}
                            value={option}
                            checked={
                              checkboxData[`${fieldIndex}_${i}`] || false
                            }
                            onChange={() => handleCheckboxChange(fieldIndex, i)}
                          />
                          <label htmlFor={`checkbox_${i}`}>{option}</label>
                        </div>
                      </>
                    ))}
                  </div>
                  {error[field.label] && (
                    <p className="text-red-500 mt-2">{error[field.label]}</p>
                  )}
                </>
              )}
              {field.type === "radio" && (
                <>
                  <div>
                    {field.options.map((option, i) => (
                      <div key={i}>
                        <input
                          className=" w-3 h-3 mx-2"
                          type="radio"
                          id={`radio_${fieldIndex}_${i}`}
                          name={`radio_${fieldIndex}`}
                          value={option}
                          checked={radioData[`${fieldIndex}`] === i}
                          onChange={() => handleRadioChange(fieldIndex, i)}
                        />
                        <label htmlFor={`radio_${fieldIndex}_${i}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                  {error[field.label] && (
                    <p className="text-red-500 mt-2">{error[field.label]}</p>
                  )}
                </>
              )}
            </div>
            <div>
              {fieldIndex !== 0 && (
                <button onClick={() => removeField(fieldIndex)}>Remove</button>
              )}
            </div>
          </div>
        ))}
        <FormBuilder formFields={formFields} onFormUpdate={handleFormUpdate} />
        <div className="w-40 m-auto mt-10">
          <button
            className="border border-gray-500 p-2 rounded-md"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
