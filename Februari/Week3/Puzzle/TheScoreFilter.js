const students = [
    { name: "Gilang", score: 85 },
    { name: "Rian", score: 70 },
    { name: "Adit", score: 90 }
];

for (let i = 0; i < students.length; i++) {
    const {name, score} = students[i];
    if(score >= 80){
        console.log(name);
    }
}

