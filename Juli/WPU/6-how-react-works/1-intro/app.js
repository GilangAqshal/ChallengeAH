// react element
// functional programming -> declarative
const Message = () => {
  return React.createElement(
    "div",
    { id: "message", className: "message" },
    "Halo, kita belajar reactjs"
  );
};

// children
function Menu() {
  return React.createElement(
    "div", // function yang return createElement
    null,
    React.createElement("li", null, "Kopi"),
    React.createElement("li", null, "Thai Tea"),
    React.createElement("li", null, "Sandwich"),
    React.createElement("li", null, "Burger"),
    React.createElement("li", null, "Nasi Goreng")
  );
}

// react DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(Message, null, null)
);
