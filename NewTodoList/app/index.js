const yargs = require("yargs");
const { readAll, readDetail, create, update, remove } = require("./model/task");

yargs.command({
  command: "read-all",
  handler: () => {
    const tasks = readAll();
    console.log("All tasks", tasks);
  },
});

yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = readDetail(id);
    console.log("Detail task", task);
  },
});

yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    const tasks = create(title, description);
    console.log("Create command executed", tasks);
  },
});

yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const tasks = update(id, title, description);
    console.log("Update command executed", tasks);
  },
});

yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const allTasks = remove(id);
    console.log("Delete command executed", allTasks);
  },
});

yargs.parse();
