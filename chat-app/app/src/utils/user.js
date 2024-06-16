let userList = [];

const getUserList = (room) => {
  return userList.filter((user) => user.room === room);
};

const pushUser = (newUser) => (userList = [...userList, newUser]);

const removeUser = (idRemove) => {
  userList = userList.filter((user) => user.id != idRemove);
};

module.exports = {
  getUserList,
  pushUser,
  removeUser,
};
