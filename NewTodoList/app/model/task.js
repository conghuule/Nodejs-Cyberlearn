const fs = require("fs");
const { title } = require("process");

const readAll = () => {
  const tasks = fs.readFileSync("data.json", "utf8");
  return JSON.parse(tasks);
};

const readDetail = (id) => {
  const tasks = readAll();
  const taskFind = tasks.find((task) => task.id == id);
  return taskFind;
};

const create = (title, description) => {
  let allTasks = readAll();
  const newTask = {
    id: Math.random().toString(),
    title,
    description,
  };
  console.log(newTask);
  allTasks = [...allTasks, newTask];
  fs.writeFileSync("data.json", JSON.stringify(allTasks));
  return allTasks;
};

const update = (id, title, description) => {
  const tasks = readAll();
  const taskIndex = tasks.findIndex((task) => task.id == id);
  const oldTask = tasks[taskIndex];
  const newTask = { ...oldTask, title, description };
  tasks[taskIndex] = newTask;
  fs.writeFileSync("data.json", JSON.stringify(tasks));
  return tasks;
};

const remove = (id) => {
  const allTasks = readAll();
  const newAllTasks = allTasks.filter((task) => task.id != id);
  fs.writeFileSync("data.json", JSON.stringify(newAllTasks));
  return newAllTasks;
};

module.exports = {
  readAll,
  readDetail,
  create,
  update,
  remove,
};
