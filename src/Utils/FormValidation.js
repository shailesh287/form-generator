export const formValidation = (formFields, setError) => {
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
