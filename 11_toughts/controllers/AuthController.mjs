import User from "../models/User.mjs";
import bcrypt from "bcryptjs";

export default class AuthController {
  static login = async (req, res) => {
    res.render("auth/login");
  };

  static loginPost = async (req, res) => {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("message", "Usuário não encontrado!");
      res.render("auth/login");

      return;
    }

    // check if passwords match
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha inválida!");
      res.render("auth/login");

      return;
    }

    //initliaze session
    req.session.userid = user.id;

    req.flash("message", "Login realizado com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  };

  static register = async (req, res) => {
    res.render("auth/register");
  };

  static registerPost = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      //mensagem pro front
      req.flash("message", "As senhas não são iguais!");
      res.render("auth/register");

      return;
    }

    //check if user exists
    const checkIfUserExists = await User.findOne({ where: { email } });

    if (checkIfUserExists) {
      req.flash("message", "O e-mail já está em uso!");
      res.render("auth/register");

      return;
    }

    //create a password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);

      //initliaze session
      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  static logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  };
}
