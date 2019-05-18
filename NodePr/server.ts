import * as http from "http";
import * as fs from "fs";

interface IMyResponse {
  statusCode?: number;
  end: (arg: string) => void;
  setHeader?: (arg1: string, arg2: string) => void;
}

interface IMyRequest {
  on: (name: string, callback: Function) => void;
  read: () => string | null;
}

interface ICharacters {
  characters: number[];
}

const getCharacters = (res: IMyResponse) => {
  let contentData: ICharacters = null;
  fs.readFile("./characterInfo.json", { encoding: "utf-8" }, (err: NodeJS.ErrnoException, content: string) => {
    if (err) {
      res.statusCode = 500;
      res.end("Server error");
      throw err;
    }

    try {
      contentData = JSON.parse(content);
      console.log(contentData.characters[0]);
    } 
    catch (ex) {
      res.statusCode = 204;
      res.end("Error in parse");
      console.log(`Error in parse: ${ex.message}`);
      return;
    }
    
    res.setHeader("Content-type", "application/json");
    res.end(content);
  });

  return contentData;
}

const tryReadFile = (res: IMyResponse) => {
  fs.readFile("./index.html", { encoding: "utf-8" }, (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end("Server error");
      throw err;
    }

    res.setHeader("Content-type", "text/html");
    res.end(content);
  });
}

const saveCharacters = (req: IMyRequest, res: IMyResponse) => {
  let body = "";

  req.on("readable", () => {
    const value = req.read();
    if (value) {
      body += value;
    }
  });

  req.on("end", () => {
    // body = JSON.parse(body);

    // console.log(body.message);
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(body);
  });
}

function handler(req, res: IMyResponse) {
  let contentData = null;

  switch (req.url) {
    case "/":
      tryReadFile(res);
      break;
    case "/getCharacters":
      contentData = getCharacters(res);
      break;
    case "/saveCharacters":
      saveCharacters(req, res);
      break;
    default:
      res.statusCode = 404;
      res.end("Not Found");
      break;
  }
}

// const newHttp = new http(); 
const server = http.createServer(handler);

export default server;
