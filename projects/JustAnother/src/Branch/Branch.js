"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Level.css");
const styles_js_1 = require("./styles.js");
class Branch extends React.Component {
    render() {
        const { character, i, length } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "right-line" },
                React.createElement(styles_js_1.default.GorizontalLine, { hidden: i === 0 },
                    React.createElement("line", { x1: "0", y1: "0", x2: "800", y2: "0", style: { stroke: "black" } })),
                React.createElement(styles_js_1.default.GorizontalLine, { hidden: i === length - 1 },
                    React.createElement("line", { x1: "0", y1: "0", x2: "800", y2: "0", style: { stroke: "black" } }))),
            React.createElement(styles_js_1.default.VerticalLine, null,
                React.createElement("line", { x1: "0", y1: "0", x2: "0", y2: "800", style: { stroke: "black" } })),
            this.props.children,
            React.createElement(styles_js_1.default.VerticalLine, { hidden: !character.children ||
                    character.children.length === 0 },
                React.createElement("line", { x1: "0", y1: "0", x2: "0", y2: "800", style: { stroke: "black" } }))));
    }
}
exports.default = Branch;
