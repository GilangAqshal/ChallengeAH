//Use modern javascript method replaceAll()
const secretMessage = "L0v3 J4v45cr1pt 3v3ryd4y";
const Message = secretMessage.replaceAll("0", "o").replaceAll("3", "e").replaceAll("4", "a").replaceAll("1", "i");

console.log(Message);

//Use Logic For looping and if-else condition
const secrettMessage = "L0v3 J4v45cr1pt 3v3ryd4y";
let result = ""
for(let i = 0; i <secrettMessage.length; i++){
    let pesan = secrettMessage[i];
    if(pesan === "0"){
        result += "o";
    }else if (pesan === "3"){
        result += "e";
    }else if (pesan === "4"){
        result += "a";
    }else if (pesan === "1"){
        result += "i";
    }else{
        result += pesan;
    }
}

console.log(result);