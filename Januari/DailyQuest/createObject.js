const user = {
  id: 24,
  email: "aras@dicoding.com",
  name1: "Arsy",
  nickname: "Aras",
  username: "aras123",
  password: "secret",
};

user.name1 = 'Gilang';

const { username, password, name1} = user;

// console.log(username, password, name1);
console.log(user.name1);