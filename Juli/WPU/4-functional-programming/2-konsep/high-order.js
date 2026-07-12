const userLogs = function (username) {
  return (message) => {
    return `${username} - ${message}`;
  };
};

const log = userLogs("agung");
console.log(log("belajar javascript functional programming"));

const onSubmit = (fn) => {
  console.log("loading...");
  setTimeout(() => {
    fn("succes");
    console.log("finish");
  }, 2000);
};

onSubmit(function (message) {
  console.log("message:", message);
});
