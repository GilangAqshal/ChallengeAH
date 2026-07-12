interface PropTypes {
  name: string;
  id: string;
  type?: string;
  label?: string;
}

const Input = (props: PropTypes) => {
  const { name, id, type = 'text', label } = props;

  return (
    <label htmlFor={id}>
      {label}
      <input type={type} name={name} id={id} />
    </label>
  );
};

export default Input;
