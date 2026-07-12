const compose =
  (...fns) =>
  (arg) =>
    fns.reduce((composed, f) => f(composed), arg);

const toUpperCase = (str) => str.toUpperCase();
const trim = (str) => str.trim();
const replaceSpaces = (str) => str.replace(/\s+/g, "_");

const transformString = compose(toUpperCase, trim, replaceSpaces);

const result = transformString(
  "Bootcamp Kajian ReactJS 2025 WPU Ramadhan Camp"
);
console.log(result);
