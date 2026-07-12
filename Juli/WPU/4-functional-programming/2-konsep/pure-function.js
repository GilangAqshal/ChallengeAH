const userAgung = {
  name: "agung",
  allowRead: true,
  allowWrite: true,
};

// const enablePermission = function () {
//   userAgung.allowRead = false;
//   userAgung.allowWrite = false;
//   return userAgung;
// };

// const enablePermission = function (user) {
//   user.allowRead = false;
//   user.allowWrite = false;
//   return user;
// };

// spread object properties
const enablePermission = function (user) {
  return {
    ...user,
    allowRead: false,
    allowWrite: false,
  };
};

console.log("before:", userAgung);
console.log("enable permission:", enablePermission(userAgung));
console.log("after:", userAgung);
