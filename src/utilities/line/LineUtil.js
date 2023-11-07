const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { LINE_NOTIFY } = require("../../constant/UrlEndpoint");
const {
  ResponseSuccess,
} = require("../../response_handling/success_handling/Success");
const {
  ResponseFailed,
} = require("../../response_handling/error_handling/Failed");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });


const sendLineNotify = ({
  message,
  imageFilePath,
  stickerPackageId,
  stickerId,
}) => {
  try {
    return new Promise((resolve) => {
      console.log("🚀 ~ file: LineUtil.js:13 ~ dotenv path :: ", path.resolve(__dirname, "../../../.env"))
      let formData = new FormData();

      if (imageFilePath) {
        const imageStream = fs.createReadStream(imageFilePath);
        formData.append("imageFile", imageStream);
      }
      if (message) formData.append("message", message);
      if (stickerPackageId)
        formData.append("stickerPackageId", stickerPackageId);
      if (stickerId) formData.append("stickerId", stickerId);
      
      let config = {
        method: "post",
        url: LINE_NOTIFY,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + process.env.LINE_TOKEN,
        },
        data: formData,
      };
      console.log("🚀 ~ file: LineUtil.js:42 ~ returnnewPromise ~ config.headers.process.env.LINE_TOKEN:", process.env.LINE_TOKEN)

      axios(config)
        .then((res) => {
          if (res.data?.status === 200)
            resolve(ResponseSuccess("send line success!"));
          resolve(ResponseFailed("send line failed!"));
        })
        .catch((err) => {
          throw err;
        });
    });
  } catch (error) {
    return ResponseFailed(error);
  }
};

module.exports = {
  sendLineNotify,
};
