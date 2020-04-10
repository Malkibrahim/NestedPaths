const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;
const getFolderList = () => {
  var links = fs.readdirSync("images", "utf8");
  var bars = [];
  return `<html>
        <head>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        </head>
        <body>

    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" aria-current="page">Home</li>
    </ol>
  </nav>
  
  <ul>
  
  ${links
    .map((link) => {
      return `<a href="/${link}">${link}</a>`;
    })
    .join("<br/>")}
  </ul>
        </body>
    </html>
  
  
 `;
};
const getLinksList = (currentFolder) => {
  var imagesFiles = fs.readdirSync(`images/${currentFolder}`, "utf8");

  return `
   <html lang="en">
       <head>
       </head>
       <body>  
       ${imagesFiles
         .map((file) => `<img src="${currentFolder}-i/${file}"/>`)
         .join("<br />")}
       </body>
   </html>
   `;
};
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const [, folderName, fileName] = req.url.split("/");
  switch (folderName) {
    case "":
      res.setHeader("Content-Type", "text/html");
      var htmlpage = getFolderList();
      res.end(htmlpage);
      break;
    case "favicon.ico":
      res.end();
      break;
    case "Nature":
      res.setHeader("Content-Type", "text/html");
      // var folderPath1 = path.join("./images", decodeURI(Nature));
      // var imagesList = fs.readdirSync(folderPath1);
      res.end(getLinksList("Nature"));
      break;
    case "Quotes":
      res.setHeader("Content-Type", "text/html");
      // var folderPath1 = path.join("./images", decodeURI(Nature));
      // var imagesList = fs.readdirSync(folderPath1);
      res.end(getLinksList("Quotes"));
      break;
    default:
      res.setHeader("Content-Type", "text/html");
      const image = req.url.split("/").reverse()[0];
      var filePath = path.join(
        "./images",
        `${folderName.split("-")[0]}`,
        decodeURI(fileName)
      );
      var images = fs.readFileSync(filePath);
      res.end(images);
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});
