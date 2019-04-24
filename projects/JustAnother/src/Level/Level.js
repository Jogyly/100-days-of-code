"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Level_1;
const React = require("react");
const nanoid = require("nanoid/non-secure");
require("./Level.css");
const Node_js_1 = require("../Node/Node.js");
const Branch_js_1 = require("../Branch/Branch.js");
const mobx_react_1 = require("mobx-react");
let Level = Level_1 = class Level extends React.Component {
    constructor() {
        super(...arguments);
        this.renderLevel = () => {
            let level = [];
            const length = this.props.characters.length;
            for (let i = 0; i < length; i++) {
                if (!this.keys) {
                    this.keys = [];
                }
                if (!this.keys[i]) {
                    this.keys[i] = nanoid();
                }
                const id = this.props.characters[i];
                const character = this.props.store.characters.get(id);
                if (character) {
                    level.push(React.createElement("div", { key: this.keys[i], className: "all-node" },
                        React.createElement(Branch_js_1.default, { character: character, i: i, length: length },
                            React.createElement("div", { className: "nodelvl" },
                                React.createElement(mobx_react_1.Provider, { store: this.props.store },
                                    React.createElement("div", null,
                                        React.createElement(Node_js_1.default, { character: character, store: this.props.store, showPopup: !!character.new }))))),
                        React.createElement("div", null, !!character.children && character.children.length !== 0 &&
                            React.createElement(Level_1, { characters: character.children, store: this.props.store }))));
                }
            }
            ;
            return level;
        };
    }
    render() {
        if (!this.props.characters || this.props.characters.length <= 0) {
            return "";
        }
        return (React.createElement("div", { className: "level" }, this.renderLevel()));
    }
};
Level = Level_1 = __decorate([
    mobx_react_1.observer
], Level);
exports.default = Level;
