"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles_js_1 = require("./styles.js");
class Toolbar extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isShowToolbar: true,
        };
        this.hideToolbar = () => {
            this.setState({
                isShowToolbar: false,
            });
        };
        this.showToolbar = () => {
            this.setState({
                isShowToolbar: true,
            });
        };
    }
    render() {
        const { isShowToolbar } = this.state;
        return (React.createElement(styles_js_1.default.ToolbarBack, null,
            isShowToolbar &&
                React.createElement(styles_js_1.default.Toolbar, null,
                    React.createElement(styles_js_1.default.ToolBarSide, { onClick: this.hideToolbar }, "^"),
                    React.createElement(styles_js_1.default.ToolbarMain, null,
                        React.createElement("input", null),
                        React.createElement("div", null, "S")),
                    React.createElement(styles_js_1.default.ToolBarSide, null, "S")),
            !isShowToolbar &&
                React.createElement(styles_js_1.default.ToolBarSideMini, { onClick: this.showToolbar }, "\\/")));
    }
    ;
}
;
exports.default = Toolbar;
