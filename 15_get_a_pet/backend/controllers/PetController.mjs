import Pet from "../models/Pet.mjs";

export default class PetController {
  //create a pet
  static create = async (req, res) => {
    res.json({ message: "Deu certo" });
  };
}
