"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Node.css");
const Popup_js_1 = require("../Popup/Popup.js");
const mobx_react_1 = require("mobx-react");
const styles_js_1 = require("./styles.js");
let Node = class Node extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showPopup: this.props.showPopup || false,
            character: this.props.character,
            active: this.props.active || false,
            childActive: false,
        };
        this.addCharacter = () => {
            const id = this.props.store.getNewId();
            console.log(`new id = ${id}`);
            const newCharacter = {
                id,
                name: "new",
                description: "sdf",
                children: [],
            };
            this.props.store.addCharacter(this.props.character.id, newCharacter);
        };
        this.showParents = () => {
        };
        this.changeShow = () => {
            this.setState({
                showPopup: !this.state.showPopup,
            });
        };
        this.refNode = (node) => {
            this.node = node;
        };
        this.handleClick = (event) => {
            if (!this.node.contains(event.target)) {
                this.makeDisActive();
            }
        };
        this.subscribe = () => {
            document.addEventListener("click", this.handleClick);
        };
        this.unsubscribe = () => {
            document.removeEventListener("click", this.handleClick);
        };
        this.makeDisActive = () => {
            this.unsubscribe();
            this.setState({
                active: false,
            });
        };
        this.makeActive = () => {
            this.subscribe();
            this.showParents();
            this.setState({
                active: true,
            });
        };
    }
    render() {
        const { active, character } = this.state;
        return (React.createElement("div", null,
            React.createElement(styles_js_1.default.Node, { ref: this.refNode, active: active, onClick: active ? this.changeShow : this.makeActive }, character.name),
            React.createElement(styles_js_1.default.Button, { active: active, onClick: this.addCharacter }, "+"),
            this.state.showPopup &&
                React.createElement(Popup_js_1.default, { character: character, changeShow: this.changeShow, edit: !!character.new })));
    }
};
Node = __decorate([
    mobx_react_1.observer
], Node);
exports.default = Node;
