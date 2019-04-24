"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class Store {
    constructor(characters) {
        this.characters = new Map();
        this.addCharacter = (parentId, newCharacter) => {
            console.log(`add for parent ${parentId} new char`);
            newCharacter.new = true;
            this.characters.set(newCharacter.id, newCharacter);
            const parent = this.characters.get(parentId);
            parent.children
                ? parent.children.push(newCharacter.id)
                : [newCharacter.id];
        };
        this.getNewId = () => {
            let id = 0;
            while (this.characters.has(id)) {
                id++;
            }
            return id;
        };
        this.changeStore = (characters) => {
            this.characters = characters;
        };
        this.saveChange = (id, name, description) => {
            console.log("asd");
            const character = this.characters.get(id);
            this.characters.set(id, Object.assign({}, character, { name, description }));
            debugger;
            console.dir(this.characters);
        };
        characters.forEach(element => {
            this.characters.set(element.id, {
                id: element.id,
                name: element.name,
                description: element.description,
                img: element.img,
                children: element.children
            });
        });
    }
}
__decorate([
    mobx_1.observable
], Store.prototype, "characters", void 0);
__decorate([
    mobx_1.action
], Store.prototype, "addCharacter", void 0);
__decorate([
    mobx_1.action
], Store.prototype, "changeStore", void 0);
__decorate([
    mobx_1.action
], Store.prototype, "saveChange", void 0);
exports.default = Store;
