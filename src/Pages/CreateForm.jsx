import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Components/Form";

const CreateForm = () => {
  return (
    <div>
      <Link to="/">
        <button className="w-16 text-3xl mt-4 ml-4">🔙</button>
      </Link>

      <h1 className="text-[25px] text-center"> Create Form </h1>

      <div className="app-container">
        <Form />
      </div>

      <div></div>
    </div>
  );
};

export default CreateForm;
