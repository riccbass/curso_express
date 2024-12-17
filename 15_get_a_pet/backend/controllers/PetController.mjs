import getToken from "../helpers/get-token.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";
import Pet from "../models/Pet.mjs";

export default class PetController {
  //create a pet
  static create = async (req, res) => {
    const { name, age, weight, color } = req.body;

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
}
