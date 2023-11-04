const { FAILED } = require("../../constant/ResponseStatus");


const ResponseFailed = (message) => {
  return { status: FAILED, message };
};
module.exports = { ResponseFailed };