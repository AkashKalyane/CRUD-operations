import React from "react";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_NUMBER,
  VALIDATOR_MINLENGTH,
} from "../../util/Validation/validators";
import { useForm } from "../../util/Hooks/useForm";
import "./NewUser.css";

function NewUser() {
  const [formState, InputHandler] = useForm({
    inputs: {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      salary: {
        value: null,
        isValid: false,
      },
    },
    isValid: false,
  });
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
        method: "POST",
        body: JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          salary: formState.inputs.salary.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="user-form" onSubmit={submitHandler}>
      <h2>Empolye Form</h2>
      <Input
        id="name"
        label="Name:"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name"
        onInput={InputHandler}
      />
      <Input
        id="email"
        label="email:"
        type="email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email"
        onInput={InputHandler}
      />
      <Input
        id="salary"
        label="salary"
        type="number"
        validators={[VALIDATOR_NUMBER(), VALIDATOR_MINLENGTH(4)]}
        errorText="Please enter a valid salary"
        onInput={InputHandler}
      />
      <button type="submit" disabled={!formState.isValid}>
        Submit
      </button>
    </form>
  );
}

export default NewUser;
