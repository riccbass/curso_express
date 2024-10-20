import Tought from "../models/Tought.mjs";
import User from "../models/User.mjs";

export default class ToughtController {
  static dashboard = async (req, res) => {
    const userId = req.session.userid;

    if (!userId) {
      res.redirect("/login");
    }

    const user = await User.findOne({
      where: { id: userId },
      include: Tought,
      plain: true,
    });

    //check if user exists
    if (!user) {
      res.redirect("/login");
    }

    const toughts = user.Toughts.map((result) => {
      return result.dataValues;
    });

    let emptyToughts = false;

    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render("toughts/dashboard", { toughts, emptyToughts });
  };

  static showToughts = async (req, res) => {
    const toughtsData = await Tought.findAll({
      include: User,
    });

    const toughts = toughtsData.map((result) => {
      return result.get({ plain: true });
    });

    console.log(toughts);

    res.render("toughts/home", { toughts });
  };

  static createTought = (req, res) => {
    res.render("toughts/create");
  };

  static createToughtSave = async (req, res) => {
    const tought = { title: req.body.title, UserId: req.session.userid };

    try {
      await Tought.create(tought);

      req.flash("message", "Pensamento criado com sucesso!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  };

  static removeTought = async (req, res) => {
    const id = req.body.id;
    const UserId = req.session.userid;

    const tought = await Tought.findOne({ where: { id, UserId } });

    console.log("tought é ", tought);

    try {
      await Tought.destroy({ where: { id, UserId } });

      req.flash("message", "Pensamento removido com sucesso!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  };

  static updateTought = async (req, res) => {
    const id = req.params.id;
    const userId = req.session.userid;

    if (!userId) {
      res.redirect("/login");
    }

    const tought = await Tought.findOne({
      where: { id, UserId: userId },
      raw: true,
    });

    res.render("toughts/edit", { tought });
  };

  static updateToughtSave = async (req, res) => {
    const id = req.body.id;
    const userId = req.session.userid;

    if (!userId) {
      res.redirect("/login");
    }

    //check if tought exists

    const checkIfToughtExists = await Tought.findOne({
      where: { id, UserId: userId },
      raw: true,
    });

    if (!checkIfToughtExists) {
      req.flash("message", "Pensamento não existe");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });

      return;
    }

    const tought = {
      title: req.body.title,
    };

    try {
      await Tought.update(tought, { where: { id } });

      req.flash("message", "Pensamento atualizado!");

      req.session.save(() => {
        res.redirect("/toughts/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  };
}
