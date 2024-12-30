import getToken from "../helpers/get-token.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";
import Pet from "../models/Pet.mjs";
import mongoose from "mongoose";

export default class PetController {
  //create a pet
  static create = async (req, res) => {
    const { name, age, weight, color } = req.body;
    const images = req.files;

    const available = true;

    //upload de imagens

    //validations

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória" });
      return;
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório" });
      return;
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória" });
      return;
    }

    if (images.length < 1) {
      res.status(422).json({ message: "A imagem é obrigatória" });
      return;
    }

    //get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    //create a pet

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      console.log(image.filename);
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  static getAll = async (req, res) => {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({
      pets,
    });
  };

  static getAllUserPets = async (req, res) => {
    //get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets,
    });
  };

  static getAllUserAdoptions = async (req, res) => {
    //get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets,
    });
  };

  static getPetById = async (req, res) => {
    const id = req.params.id;

    //check if id is valid
    if (!mongoose.isValidObjectId(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    res.status(200).json({
      pet,
    });
  };

  static removePetById = async (req, res) => {
    const id = req.params.id;

    //check if id is valid
    if (!mongoose.isValidObjectId(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    await Pet.findByIdAndDelete(id);

    res.status(200).json({ message: "Pet removido com sucesso!" });
  };

  static updatePet = async (req, res) => {
    const id = req.params.id;
    const { name, age, weight, color, available } = req.body;
    const images = req.files;

    const updatedData = {};

    //check if id is valid
    if (!mongoose.isValidObjectId(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    } else {
      updatedData.name = name;
    }

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória" });
      return;
    } else {
      updatedData.age = age;
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório" });
      return;
    } else {
      updatedData.weight = weight;
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória" });
      return;
    } else {
      updatedData.color = color;
    }

    if (images.length > 0) {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet atualizado" });
  };

  static schedule = async (req, res) => {
    const id = req.params.id;

    //check if id is valid
    if (!mongoose.isValidObjectId(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //check if user reigstered the pet

    //check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: "O pet é seu",
      });
      return;
    }

    //check if user already scheluded the pet
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: "Você já agendou uma visita para esse pet",
        });
        return;
      }
    }

    //add user to pet

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`,
    });
  };

  static concludeAdoption = async (req, res) => {
    const id = req.params.id;

    //check if id is valid
    if (!mongoose.isValidObjectId(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    //check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" });
      return;
    }

    //check if logged in user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde",
      });
      return;
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: "Parabéns! o ciclo de adoção foi finalizado com sucesso",
    });
  };
}
