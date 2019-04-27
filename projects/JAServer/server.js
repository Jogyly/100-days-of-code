import http from "http";
import routing from "routing";

const server = new http.Server((req, res) => {
  let jsonString = '';
  req.on("data", data => (
    jsonString += data
  ));

  req.on("end", () => (
    routing.define(req, res, jsonString)
  ));
});

server.listen(8000);
