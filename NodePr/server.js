"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var url = require("url");
var multiparty = require("multiparty");
var syMyName = function (req, res) {
    var body;
    req.on("readable", function () {
        var value = req.read();
        console.log("value: ", value);
        if (value) {
            body += value.toString();
        }
    });
    req.on("end", function () {
        console.log(body);
        res.end();
    });
};
// let characters: string;
var getCharacters = function (res) {
    var contentData = null;
    fs.readFile("./characterInfo.json", { encoding: "utf-8" }, function (err, content) {
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
            console.log("Error in parse: " + ex.message);
            return;
        }
    });
    return contentData;
};
var getImage = function (req, res) {
    var sendAnswer = function (content) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.statusCode = 200;
        res.end(content);
    };
    fs.readFile("./media/" + req.query.id + ".jpg", function (err, content) {
        if (!err) {
            sendAnswer(content);
            return;
        }
        fs.readFile("./media/" + req.query.id + ".png", function (err, content) {
            if (err) {
                res.statusCode = 418;
                res.end("teapot :)");
            }
            sendAnswer(content);
        });
    });
};
var saveImage = function (req, res) {
    var count = 0;
    var form = new multiparty.Form();
    form.on('part', function (part) {
        part
            .pipe(fs.createWriteStream("./media/" + part.filename))
            .on("close", function () {
            console.log(part);
            res.end();
        });
    });
    form.parse(req);
};
var deleteImage = function (req, res) {
    var id = req.query.id;
    fs.unlink("./media/" + id + ".img", function () { return console.log("delete"); });
    fs.unlink("./media/" + id + ".png", function () { return console.log("delete"); });
};
var tryReadFile = function (res) {
    console.log("here");
    fs.readFile("./index.html", { encoding: "utf-8" }, function (err, content) {
        if (err) {
            res.statusCode = 500;
            res.end("Server error");
            throw err;
        }
        // characters = content;
        // res.setHeader("Content-type", "text/html");
        // res.end(content);
    });
};
var saveCharacters = function (req, res) {
    var body = "";
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Content-type", "application/json");
    req.on("readable", function () {
        var value = req.read();
        console.log("value: ", value);
        if (value) {
            body += value.toString();
        }
    });
    req.on("end", function () {
        console.log(body);
        if (!body || !JSON.parse(body)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.writeFile("./characterInfo.json", body, function () {
            res.statusCode = 200;
            res.end();
        });
    });
};
function handler(req, res) {
    var contentData = null;
    var rurl = req.url;
    var url_parts;
    if (req.method == 'GET') {
        url_parts = url.parse(rurl, true);
        rurl = url_parts.pathname;
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
var server = http.createServer(handler);
exports.default = server;
