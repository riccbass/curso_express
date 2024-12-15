import createUserToken from "../helpers/create-user-token.mjs";
import getToken from "../helpers/get-token.mjs";
import getUserByToken from "../helpers/get-user-by-token.mjs";
import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);

      return;
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(422).json({ message: "E-mail não cadastrado" });
      return;
    }

    //check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha incorreta" });
      return;
    }

    await createUserToken(user, req, res);
  };

  static checkUser = async (req, res) => {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "juventue1913secret");

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  };

  static getUserById = async (req, res) => {
    const id = req.params.id;

    if (id.length !== 24) {
      res.status(422).json({ message: "id deve ter 24 carácteres" });
      return;
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).json({ user });
  };

  static editUser = async (req, res) => {
    const { name, email, phone, password, confirmpassword } = req.body;

    let image = "";

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      res.status(422).json({ message: "usuário não encontrado" });
      return;
    }

    //validations

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    //check if email has already been taken
    const userExists = await User.findOne({ email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "e-mail já em uso" });
      return;
    }

    user.email = email;

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }

    user.phone = phone;

    if (confirmpassword !== password) {
      res
        .status(422)
        .json({ message: "A confirmação da senha e a senha devem ser iguais" });
      return;
    } else if (confirmpassword === password && password != null) {
      //create password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      //return user update user
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );

      res.status(200).json({
        message: "Usuário atualizado com sucesso",
      });
    } catch (err) {
      res.status(500).json({ message: err });
      return;
    }
    return;
  };
}
