import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FormPreview = () => {
  const [formdata, setFormData] = useState([]);
  const pathId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const jsonData = localStorage.getItem("formData");
    if (jsonData) {
      const formData = JSON.parse(jsonData);
      const matchingData = formData.find(
        (item) => item.id === parseInt(pathId)
      );
      setFormData(matchingData?.data || []);
    } else {
      console.log("No data found in local storage.");
    }
  }, []);

  return (
    <div className="mx-6 mt-10  rounded-sm p-4">
      <Link to="/">
        <button className="w-16 text-3xl mt-4 ml-4">🔙</button>
      </Link>
      <div>
        <h1 className="text-[25px] text-center"> Form Preview </h1>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        {formdata.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className="m-6 flex justify-between items-center"
          >
            <div>
              <label className="block" htmlFor={field.label}>
                {field.label}{" "}
              </label>
              {(field.type === "text" ||
                field.type === "email" ||
                field.type === "number") && (
                <>
                  <input
                    disabled
                    className="border w-80 h-10 text-left rounded-lg mt-3 px-2"
                    type={field.type}
                    defaultValue={field.value}
                  />
                </>
              )}
              {field.type === "textarea" && (
                <textarea
                  className="border w-80 h-20 text-left ml-3 px-2"
                  defaultValue={field.value}
                />
              )}
              {field.type === "dropdown" && (
                <select
                  className="border w-52 h-10 text-left my-2 rounded-lg px-2"
                  defaultValue={field.selectedOption || ""}
                  disabled
                >
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "checkbox" && (
                <div className="mt-3">
                  {field.options.map((option, i) => (
                    <div key={i}>
                      <input
                        className="w-4 h-4 mx-3"
                        type="checkbox"
                        id={`checkbox_${i}`}
                        name={`checkbox_${i}`}
                        defaultChecked={option.option}
                        disabled
                      />
                      <label htmlFor={`checkbox_${i}`}>{option.option}</label>
                    </div>
                  ))}
                </div>
              )}
              {field.type === "radio" && (
                <div>
                  {field.options.map((option, i) => (
                    <div key={i}>
                      <input
                        className="w-3 h-3 mx-2"
                        type="radio"
                        id={`radio_${fieldIndex}_${i}`}
                        name={`radio_${fieldIndex}`}
                        defaultChecked={i === field.selectedOptionIndex}
                        disabled
                      />
                      <label htmlFor={`radio_${fieldIndex}_${i}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default FormPreview;
