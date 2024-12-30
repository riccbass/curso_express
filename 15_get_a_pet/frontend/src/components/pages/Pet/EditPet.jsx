import api from "../../../utils/api";
import styles from "./AddPet.module.css";

import PetForm from "../../form/PetForm";

/* hooks */

import useFlashMessage from "../../../hooks/useFlashMessage";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPet = () => {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        Authorization: `Bearer ${JSON.parse(token)}`,
      })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [token, id]);

  const updatePet = async (pet) => {
    let msgType = "success";

    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append("images", pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .patch(`pets/${pet._id}`, formData, {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data", //isso pq leva imagem
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depos da edição os dados serão atualizados no sistema</p>
      </div>
      {pet.name && (
        // mesmo não mandando o setter, ele consegue modificar
        <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />
      )}
    </section>
  );
};

export default EditPet;
