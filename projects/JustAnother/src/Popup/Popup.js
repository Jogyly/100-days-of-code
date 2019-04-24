"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import React, { Component } from "react";
const React = require("react");
const mobx_react_1 = require("mobx-react");
const styles_js_1 = require("./styles.js");
let Popup = class Popup extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            character: this.props.character,
            id: this.props.character.id,
            name: this.props.character.name,
            description: this.props.character.description,
            edit: this.props.edit || false,
        };
        this.componentDidMount = () => {
            document.addEventListener("click", this.handleClick);
            document.body.style.overflow = "hidden";
        };
        this.componentWillUnmount = () => {
            document.removeEventListener("click", this.handleClick);
            document.body.style.overflow = "";
        };
        this.renderCharacter = () => {
            return (React.createElement(styles_js_1.default.Popup, { ref: this.refWrapPopup },
                React.createElement("span", { className: "edit", onClick: this.handleEdit }, "\u039E"),
                React.createElement("span", { className: "cross", onClick: this.props.changeShow }, "\u00D7"),
                React.createElement("div", { className: "name" }, this.state.name),
                React.createElement("div", { className: "description" }, this.state.description),
                React.createElement("div", { className: "img" },
                    React.createElement("img", { src: `./img/${this.state.id}.jpg`, alt: this.state.id.toString() }))));
        };
        this.renderEdit = () => {
            return (React.createElement(styles_js_1.default.Popup, { ref: this.refWrapPopup },
                React.createElement("span", { className: "edit", onClick: this.handleEdit }, "\u039E"),
                React.createElement("div", { className: "actions" },
                    React.createElement("button", { className: "primary_button", onClick: this.saveChange }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")),
                React.createElement("span", { className: "cross", onClick: this.props.changeShow }, "\u00D7"),
                React.createElement("input", { className: "name", type: "text", value: this.state.name, onChange: this.handleChangeName }),
                React.createElement("textarea", { value: this.state.description, onChange: this.handleChangeDescription }),
                React.createElement("div", { className: "img" },
                    React.createElement("img", { src: `./img/${this.state.id}.jpg`, alt: this.state.id.toString() }))));
        };
        this.refWrapPopup = (node) => {
            this.wrapPopup = node;
        };
        this.handleClick = (event) => {
            if (!this.wrapPopup.contains(event.currentTarget)) {
                this.closePopup();
            }
        };
        this.closePopup = () => {
            const { name, description, character } = this.state;
            if (name !== character.name ||
                description !== character.description) {
                const result = window.confirm("Want to save?");
                if (result) {
                    this.saveChange();
                }
            }
            this.props.changeShow();
        };
        this.saveChange = () => {
            const { character, name, description } = this.state;
            this.props.store.saveChange(character.id, name, description);
            debugger;
            console.dir(this.props.store.characters);
            // character.name = name;
            // character.description = description;
        };
        this.handleChangeName = (event) => {
            const name = event.target.value;
            this.setState({
                name
            });
        };
        this.handleChangeDescription = (event) => {
            const description = event.target.value;
            this.setState({
                description
            });
        };
        this.handleEdit = () => {
            this.setState({
                edit: !this.state.edit,
            });
        };
    }
    render() {
        return (React.createElement(React.Fragment, null, this.state.edit
            ? this.renderEdit()
            : this.renderCharacter()));
    }
};
Popup = __decorate([
    mobx_react_1.inject("store"),
    mobx_react_1.observer
], Popup);
exports.default = Popup;
