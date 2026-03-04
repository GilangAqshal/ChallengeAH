const correctUsername = "admin";
const correctPassword = 12345;

let attempts = 0;
let isLocked = false;

const login = (username ,password) => {
    if(isLocked){
        return "Account Locked";
    }

    if(username === correctUsername && password === correctPassword){
        attempts = 0;
        return `Login Success`;
    }else{
        attempts++;

        if(attempts >= 3){
            isLocked = true;
        }
        return `Login Failed`
    }
}

console.log(login("admin", 12345));