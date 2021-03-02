const http = require("http");
const fs = require("fs").promises;
//const jsondata = require("../src/data.json");

// Can edit these in development server:
const port = 8000;
const host = "localhost";

const writeJSON = (data, item, path) => {
  data.push(JSON.parse(item));
  console.log(data);
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      throw err;
    }
  });
};

const requestListener = (req, res) => {
  const path = "../src/data.json";
  fs.readFile(path, "utf-8")
    .then((data) => {
      if (req.method === "POST") {
        req.on("data", (item) =>
          writeJSON(JSON.parse(data), item.toString("utf-8"), path)
        );
      }
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.write(data);
      res.end();
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
      return;
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
