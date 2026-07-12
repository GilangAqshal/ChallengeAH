// function add(a: number, b: number): number {
//   return a + b;
// }

type OnSubmit = (values: any) => void;

function onSubmit(cb: OnSubmit) {
  const values = {};
  cb(values);
}

onSubmit((values) => {
  console.log(values);
});
