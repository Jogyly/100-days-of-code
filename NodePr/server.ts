import * as http from "http";
import * as fs from "fs";
import * as url from "url";
import * as querystring from "querystring";
import * as multiparty from "multiparty";

interface IMyResponse {
  statusCode?: number;
  end: (arg?: string | Buffer) => void;
  setHeader?: (arg1: string, arg2: string) => void;
}

type QueryType = {
  id: number
}

interface IMyRequest {
  query: QueryType;
  on: (name: string, callback: Function) => void;
  read: () => string | Buffer | null;
}

interface ICharacters {
  characters: number[];
}

const syMyName = (req: IMyRequest, res: IMyResponse) => {
  let body;
  req.on("readable", () => {
    const value = req.read();
    console.log("value: ", value);
    if (value) {
      body += value.toString();
    }
  });

  req.on("end", () => {
    console.log(body);
    res.end();
  });
}

// let characters: string;

const getCharacters = (res: IMyResponse) => {
  let contentData: ICharacters = null;
  fs.readFile("./characterInfo.json", { encoding: "utf-8" }, (err: NodeJS.ErrnoException, content: string) => {
    if (err) {
      res.statusCode = 500;
      res.end("Server error");
      throw err;
    }

    try {
      console.log("res characters");
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader("Content-type", "application/json");
      res.end(content);
    } 
    catch (ex) {
      res.statusCode = 204;
      res.end("Error in parse");
      console.log(`Error in parse: ${ex.message}`);
      return;
    }
  });

  return contentData;
}

const getImage = (req: IMyRequest, res: IMyResponse) => {
  const sendAnswer = (content) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.statusCode = 200;
    res.end(content);
  }

  fs.readFile(`./media/${req.query.id}.jpg`, (err, content) => {
    if (!err) {
      sendAnswer(content);
      return;
    }

    fs.readFile(`./media/${req.query.id}.png`, (err, content) => {
      if (err) {
        res.statusCode = 418;
        res.end("teapot :)");
      }
  
      sendAnswer(content);
    });
  });
}

const saveImage = (req: IMyRequest, res: IMyResponse) => {
  let count = 0;
  const form = new multiparty.Form();

  form.on('part', (part) => {
    part
      .pipe(fs.createWriteStream(`./media/${part.filename}`))
      .on("close", () => {
        console.log(part);
        res.end();
      });
  });
  form.parse(req);
}

const deleteImage = (req: IMyRequest, res: IMyResponse) => {
  const id = req.query.id;
  fs.unlink(`./media/${id}.img`, () => console.log("delete"));
  fs.unlink(`./media/${id}.png`, () => console.log("delete"));
}

const tryReadFile = (res: IMyResponse) => {
  console.log("here");
  fs.readFile("./index.html", { encoding: "utf-8" }, (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end("Server error");
      throw err;
    }

    // characters = content;

    // res.setHeader("Content-type", "text/html");
    // res.end(content);
  });
}

const saveCharacters = (req: IMyRequest, res: IMyResponse) => {
  let body = "";

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Content-type", "application/json");

  req.on("readable", () => {
    const value = req.read();
    console.log("value: ", value);
    if (value) {
      body += value.toString();
    }
  });

  req.on("end", () => {
    console.log(body);
    if (!body || !JSON.parse(body)) {
      res.statusCode = 404;
      res.end();
      return;
    }

    fs.writeFile("./characterInfo.json", body, () => {
      res.statusCode = 200;
      res.end();
    });
  });
}

function handler(req, res: IMyResponse) {
  let contentData = null;

  let rurl = req.url;
  let url_parts;

  if(req.method=='GET') {
    url_parts = url.parse(rurl,true);
    rurl = url_parts.pathname
  }

  switch (rurl) {
    case "/":
      // syMyName(req, res);
      // break;
      tryReadFile(res);
      break;
    case "/getImage":
      getImage(url_parts, res);
      break;
    case "/saveImage":
      saveImage(req, res);
      break;
    case "/deleteImage":
      deleteImage(req, res);
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
