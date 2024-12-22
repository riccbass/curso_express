// api

import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const useAuth = () => {
  const register = async (user) => {
    try {
      const data = api.post("/users/register", user).then((response) => {
        return response.data;
      });

      console.log(data);
    } catch (error) {
      //tratar o error
      console.log(error);
    }
  };

  return { register };
};

export default useAuth;
