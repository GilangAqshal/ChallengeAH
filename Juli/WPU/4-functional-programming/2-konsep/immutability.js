const color = {
  title: "lawn",
  color: "#00FF00",
  rating: 0,
};

console.log("before mutate -> rating:", color.rating);

// const rateColor = function (color, rating) {
//   color.rating = rating;
//   return color;
// };

const rateColor = function (color, rating) {
  const newColor = Object.assign({}, color, {
    // rating: rating,
    rating,
  });
  return newColor;
};

const rating = rateColor(color, 5).rating;

console.log("mutate rating:", rating);
console.log("after mutate -> rating:", color.rating);
