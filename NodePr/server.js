"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var getCharacters = function (res) {
    var contentData = null;
    fs.readFile("./characterInfo.json", { encoding: "utf-8" }, function (err, content) {
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
            console.log("Error in parse: " + ex.message);
            return;
        }
        res.setHeader("Content-type", "application/json");
        res.end(content);
    });
    return contentData;
};
var tryReadFile = function (res) {
    fs.readFile("./index.html", { encoding: "utf-8" }, function (err, content) {
        if (err) {
            res.statusCode = 500;
            res.end("Server error");
            throw err;
        }
        res.setHeader("Content-type", "text/html");
        res.end(content);
    });
};
var saveCharacters = function (req, res) {
    var body = "";
    req.on("readable", function () {
        var value = req.read();
        if (value) {
            body += value;
        }
    });
    req.on("end", function () {
        // body = JSON.parse(body);
        // console.log(body.message);
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.end(body);
    });
};
function handler(req, res) {
    var contentData = null;
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
var server = http.createServer(handler);
exports.default = server;
