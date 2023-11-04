const express = require("express");
const cors = require("cors");
const path = require("path");
const { generatePngByHtml } = require("./utilities/image_gen/GenerateImage");

const { sendLineNotify } = require("./utilities/line/LineUtil");
const { ResponseFailed } = require("./response_handling/error_handling/Failed");
const { ResponseSuccess } = require("./response_handling/success_handling/Success");
const { FAILED } = require("./constant/ResponseStatus");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send(ResponseSuccess("it success"));
});

app.post("/v1/send-line-image", async (req, res) => {
  try {
    let image_path = path.resolve(
      __dirname,
      "../src/assets/images/summary.png"
    );

    let gen_image = await generatePngByHtml({}, image_path);
    if (gen_image.status === FAILED) throw gen_image.message;

    let send_line = await sendLineNotify({
      message: "test",
      imageFilePath: image_path,
    });
    if (send_line.status === FAILED) throw send_line.message;

    res.status(200).send(send_line);
  } catch (error) {
    res.status(200).send(ResponseFailed(error));
  }
});

app.listen(PORT, () => {
  console.log("NUTJP Core service is Running on PORT :: " + PORT);
});
