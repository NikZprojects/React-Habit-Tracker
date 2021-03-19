const http = require("http");

const data = JSON.stringify({
  id: "bc354402-3d06-42f6-b4f3-38104e3e3955",
  name: "Go for a Run again",
  complete: false,
});

const options = {
  hostname: "localhost",
  port: 8000,
  path: "/data.json",
  method: "POST",
  data: data,
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();
