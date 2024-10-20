import Task from "../models/Task.mjs";

export class TaskController {
  static createTask = (req, res) => {
    res.render("tasks/create");
  };

  static createTaskSave = async (req, res) => {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    //validações
    //processar dados

    await Task.create(task);

    res.redirect("/tasks");
  };

  static showTasks = async (req, res) => {
    const tasks = await Task.findAll({ raw: true });

    res.render("tasks/all", { tasks });
  };

  static updateTask = async (req, res) => {
    const id = req.params.id;

    const task = await Task.findOne({ where: { id }, raw: true });

    res.render("tasks/edit", { task });
  };

  static updateTaskPost = async (req, res) => {
    const id = req.body.id;

    const currentTask = await Task.findOne({ where: { id }, raw: true });

    if (!currentTask) {
      //aviso que deu erro
      return res.status(404).send("Página não encontrada!");
    }

    const task = {
      title: req.body.title,
      description: req.body.description,
    };

    await Task.update(task, { where: { id } });

    res.redirect("/tasks");
  };

  static toggleStatus = async (req, res) => {
    const id = req.body.id;

    const currentTask = await Task.findOne({ where: { id }, raw: true });
    const task = {
      done: !currentTask.done,
    };

    await Task.update(task, { where: { id } });

    res.redirect("/tasks");
  };

  static removeTask = async (req, res) => {
    const id = req.body.id;

    await Task.destroy({ where: { id } });

    res.redirect("/tasks");
  };
}
