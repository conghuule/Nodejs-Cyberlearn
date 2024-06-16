const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("task_management", "root", "leconghuu", {
  host: "localhost",
  dialect: "mysql",
});

const Task = sequelize.define("Task", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
});

const createTask = async (name, status) => {
  //c1
  //   const newTask = Task.build({ name, status });
  //   await newTask.save();
  //c2
  await Task.create({ name, status });
};
// createTask("Hoc 2", "Pendding");

const getAllTasks = async () => {
  const allTasks = await Task.findAll();
  console.log(JSON.stringify(allTasks, null, 2));
};

// getAllTasks();

const getTaskById = async (id) => {
  const task = await Task.findOne({
    where: {
      id,
    },
  });
  console.log(JSON.stringify(task, null, 2));
};

// getTaskById(2);

const updateTask = async (id, data) => {
  await Task.update(data, {
    where: {
      id,
    },
  });
};

// updateTask(1, { name: "Hoc NodeJS", status: "Done" });

const deleteTask = async (id) => {
  await Task.destroy({
    where: {
      id,
    },
  });
};

// deleteTask(3);

const syncModel = async () => {
  await Task.sync({ force: true });
  console.log("All models were synchronized successfully.");
};

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

checkConnection();
