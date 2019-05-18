"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_js_1 = require("./server.js");
var domain = require("domain");
var serverDomain = domain.create();
serverDomain.on("error", function (err) {
    console.error("server err: " + err.message);
});
serverDomain.run(function () {
    server_js_1.default.listen(3000);
});
