// imperative
const messageDiv = document.createElement("div"); // create element

const root = document.getElementById("root");
messageDiv.append("Halo, kita belajar ReactJS");
root.appendChild(messageDiv);
// DOM -> Document Object Model

function createElement(element, props, ...children) {
  console.log(element);
  console.log(props);
  console.log(children);
}

const React = {
  createElement,
};

React.createElement("div", { id: "menu" }, "children1", "child2", "child3");
