import User from "../models/User.mjs";

export default class UserController {
  static register = async (req, res) => {
    const { name, email, phone, password, confirmpassword } = req.body;

    //validations

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmação da senha é obrigatória" });
      return;
    }

    if (confirmpassword !== password) {
      res
        .status(422)
        .json({ message: "A confirmação da senha e a senha devem ser iguais" });
      return;
    }

    //check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(422).json({ message: "E-mail já cadastrado" });
      return;
    }

    //create password
  };
}
