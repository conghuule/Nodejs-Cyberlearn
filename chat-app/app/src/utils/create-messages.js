const formatTime = require("date-format");

const createMessages = (messagesText) => {
  const messages = {
    messagesText,
    createAt: formatTime("dd/MM/yyyy - hh:mm", new Date()),
  };
  return messages;
};

module.exports = {
  createMessages,
};
