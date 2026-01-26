const fruit = ['Apple', 'Avocado', 'Pineapple'];
const vegetables = ['Tomato', 'Mentimun', 'Corn'];

const food = (index) => {
  for(let i = index; i < fruit.length; i++){
      console.log(`Makanan Ke-${i + 1}  Saya adalah ${fruit[i]} & ${vegetables[i]}`);
  }

}  
// console.log("Tidak ada makanan");

food(0);