"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Level_js_1 = require("../Level/Level.js");
const Toolbar_js_1 = require("../Toolbar/Toolbar.js");
const readTextFile_js_1 = require("../utils/readTextFile.js");
const mobx_react_1 = require("mobx-react");
const store_js_1 = require("../store/store.js");
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            load: false,
            store: null,
        };
        this.componentWillMount = () => {
            readTextFile_js_1.default("./characterInfo.json", this.loadRes);
        };
        this.loadRes = (response) => {
            if (!response || !response.characters) {
                return null;
            }
            const store = new store_js_1.default(response.characters);
            this.setState({
                load: true,
                store,
            });
        };
    }
    render() {
        const { store, load } = this.state;
        if (!load)
            return ("");
        return (React.createElement(mobx_react_1.Provider, { store: store },
            React.createElement(React.Fragment, null,
                React.createElement(Toolbar_js_1.default, null),
                React.createElement(Level_js_1.default, { characters: [0], store: store }))));
    }
    ;
}
;
exports.default = mobx_react_1.observer(App);
