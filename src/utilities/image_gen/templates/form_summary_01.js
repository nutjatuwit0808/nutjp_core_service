const HTML_FORM = `<html>
                    <head>
                        <title>Sample HTML Table</title>
                    </head>
                    <body>
                        <h2>Sample HTML Table</h2>
                        <table border="1">
                            <tr>
                            <th>คิว</th>
                            <th>Age</th>
                            <th>City</th>
                            </tr>
                            <tr>
                            <td>John Doe</td>
                            <td>30</td>
                            <td>New York</td>
                            </tr>
                            <tr>
                            <td>Jane Smith</td>
                            <td>25</td>
                            <td>Los Angeles</td>
                            </tr>
                            <tr>
                            <td>Bob Johnson</td>
                            <td>35</td>
                            <td>Chicago</td>
                            </tr>
                            <tr>
                            <td>Bob Johnson</td>
                            <td>35</td>
                            <td>Chicago</td>
                            </tr>
                            <tr>
                            <td>Bob Johnson</td>
                            <td>35</td>
                            <td>Chicago</td>
                            </tr>
                            <tr>
                            <td>Bob Johnson</td>
                            <td>35</td>
                            <td>Chicago</td>
                            </tr>
                            <tr>
                            <td>Bob Johnson</td>
                            <td>35</td>
                            <td>Chicago</td>
                            </tr>
                        </table>
                     </body>
                    </html>`;
const getHtmlFormByData = (input) => {
  const headers = ["คิว", "ขนส่ง", "ช้ำเครื่อง", "%", "ช้ำขนส่ง", "%"];
  let header_html = getHeaderRow(headers);
  let content_html = getBodyRow(input);
  let today = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let html_form = getHTMLForm(today, header_html, content_html);
  return html_form;
};
const getHeaderRow = (headers) => {
  let col_datas = "";
  for (let head of headers) {
    col_datas += "<th>" + head + "</th>";
  }
  return `<tr>${col_datas}</tr>`;
};
const getBodyRow = (bodys) => {
  let col_datas = "";
  for (let body of bodys) {
    col_datas += `<tr>
                    <td>${body.q}</td>
                    <td>${body.deliver}</td>
                    <td>${body.mac_lost}</td>
                    <td>${body.mac_lost_per}</td>
                    <td>${body.del_lost}</td>
                    <td>${body.del_lost_per}</td>
                  </tr>`;
  }
  return col_datas;
};
const getHTMLForm = (today, header_html, content_html) => {
  let html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Deliver Summary</title>
                    <style>
                    html {
                        font-family: Arial, Helvetica, sans-serif
                    }
            
                    .date_container {
                        display: flex;
                        justify-content: flex-end;
                        font-weight: bold;
                    }
            
                    .title_container {
                        display: flex;
                        justify-content: center;
                    }
            
                    .title_container h2 {
                        text-decoration: underline;
                        font-size: 26px;
                    }
            
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
            
                    table th, td{
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: center;
                    }
                    table th {
                        background-color: #557C55;
                        color: #F2FFE9;
                        font-weight: 400;
                    }
                    tr td:nth-child(2) {
                        text-align: start;
                    }
                    </style>
                </head>

                <body>
                    <div class="date_container">
                        <p>${today}</p>
                    </div>
                    <div class="title_container">
                        <h2>สรุปยอดขนส่ง</h2>
                    </div>
                    <table border="1">
                        ${header_html}
                        ${content_html}
                    </table>
                </body>
                </html>`;

  return html;
};
module.exports = {
  HTML_FORM,
  getHtmlFormByData,
};
