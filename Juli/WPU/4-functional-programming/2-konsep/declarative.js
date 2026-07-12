// imperative
const string = "WPU Ramadhan Camp 2025";
let urlSlug = "";
for (let i = 0; i < string.length; i++) {
  if (string[i] === " ") {
    urlSlug += "-";
  } else {
    urlSlug += string[i];
  }
}
console.log("imperative URL slug:", urlSlug);

// declarative
// const urlSlug = string.replace(/ /g, "-");
// console.log("declarative URL slug:", urlSlug);
