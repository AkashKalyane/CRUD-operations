import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_NUMBER,
  VALIDATOR_MINLENGTH,
} from "../../util/Validation/validators";
import Input from "./Input";
import { useForm } from "../../util/Hooks/useForm";
import "./NewUser.css";

function UpdateUser() {
  const navigate = useNavigate();
  const userId = useParams().userId;
  const [loadedUser, setLoadedUser] = useState();

  const [formState, InputHandler, setFormData] = useForm({
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
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const responseData = await response.json();
        setLoadedUser(responseData.user);
        setFormData(
          {
            name: {
              value: responseData.user.name,
              isValid: true,
            },
            email: {
              value: responseData.user.email,
              isValid: true,
            },
            salary: {
              value: responseData.user.salary,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [userId, setFormData]);

  async function updateHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            salary: formState.inputs.salary.value,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  if (!loadedUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form className="user-form" onSubmit={updateHandler}>
        <h2>Update Details</h2>
        <Input
          id="name"
          label="Name:"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput={InputHandler}
          initialValue={loadedUser.name}
          initialValid={true}
        />
        <Input
          id="email"
          label="Email:"
          type="email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email"
          onInput={InputHandler}
          initialValue={loadedUser.email}
          initialValid={true}
        />
        <Input
          id="salary"
          label="Salary:"
          type="number"
          validators={[VALIDATOR_NUMBER(), VALIDATOR_MINLENGTH(4)]}
          errorText="Please enter a valid salary"
          onInput={InputHandler}
          initialValue={loadedUser.salary}
          initialValid={true}
        />
        <div className="buttons">
          <button
            type="button"
            className="form-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
          <button className="form-button" type="submit" disabled={!formState.isValid}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateUser;


