const { SUCCESS } = require("../../constant/ResponseStatus");

const ResponseSuccess = (message) => {
  return { status: SUCCESS, message };
};
module.exports = { ResponseSuccess };
