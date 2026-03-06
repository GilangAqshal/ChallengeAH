let attempts = 0;
let isLocked = false;

function login(username, password) {

  if (isLocked) {
    return "Account Locked";
  }

  if (username === "admin" && password === "admin123") {
    attempts = 0;
    return "Success";
  } else {
    attempts++;

    if (attempts >= 3) {
      isLocked = true;

      setTimeout(() => {
        isLocked = false;
        attempts = 0;
      }, 5000);
    }

    return "Failed";
  }
}

console.log(login("admin", "admin123"))