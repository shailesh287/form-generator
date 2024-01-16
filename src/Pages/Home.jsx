import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [formdata, setFormData] = useState([]);

  useEffect(() => {
    const jsonData = localStorage.getItem("formData");
    if (jsonData) {
      const formData = JSON.parse(jsonData);

      setFormData(formData);
    } else {
      console.log("No data found in local storage.");
    }
  }, []);

  return (
    <div className="w-11/12 m-auto">
      <div className="w-32  text-center border-2 p-2 mt-16 border-black rounded-lg ml-auto ">
        <Link to="/create">
          <button>Create Form</button>
        </Link>
      </div>
      {formdata.length ? (
        <>
          <div className="mt-9 w-full">
            {formdata.map((formItem, index) => (
              <div
                key={index}
                className="border w-full p-2 mt-2 rounded-md flex justify-between"
              >
                {formItem.data.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    {field.label === "Form Name" && (
                      <p>Form Name: {field.value}</p>
                    )}
                  </div>
                ))}
                <Link to={`/form/${formItem?.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mt-9 w-full flex justify-center text-2xl">
            No data found
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
