const user = {
  username: "agung",
  log(message) {
    return `${this.username} - ${message}`;
  },
  greeting(greeting) {
    return greeting;
  },
  getUsername() {
    return this.username;
  },
};

console.log(user.getUsername());
console.log(user.greeting("Selamat pagi!"));
console.log(user.log("menyapa selamat pagi"));
