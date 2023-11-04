const puppeteer = require("puppeteer");
const fs = require("fs");
const { HTML_FORM } = require("./templates/form_summary_01");
const { ResponseFailed } = require("../../response_handling/error_handling/Failed");
const { ResponseSuccess } = require("../../response_handling/success_handling/Success");

const generatePngByHtml = (html_data, file_dest) => {
  //file_dest = "./images/output.png"
  try {
    return new Promise(async (resolve) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(HTML_FORM);

      // Capture a screenshot
      const screenshot = await page.screenshot({ encoding: "base64" });
      await browser.close();

      // Save the screenshot as a PNG file
      fs.writeFileSync(file_dest, Buffer.from(screenshot, "base64"));
      resolve(ResponseSuccess("PNG image generated and saved as " + file_dest));
    });
  } catch (error) {
    return ResponseFailed(error);
  }
};

module.exports = {
  generatePngByHtml,
};
