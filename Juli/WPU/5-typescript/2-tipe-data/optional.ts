function generateError(msg: string) {
  throw new Error(msg);
}

generateError("A");
generateError("B");

type User = {
  username: string;
  age: number;
  address?: string;
};

const user: User = {
  username: "agung",
  age: 33,
};

function fetchData<T>(): T {
  return {} as T;
}

type Payload = {
  name: string;
  price: number;
  qty: number;
};

function create(data: Partial<Payload>) {}

const userData = fetchData<User>();
