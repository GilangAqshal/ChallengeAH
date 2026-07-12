interface PropTypes {
  name: string;
  id: string;
  type?: string;
  label?: string;
  onChange?: any;
}

const Input = (props: PropTypes) => {
  const { name, id, type = 'text', label, onChange } = props;

  return (
    <label htmlFor={id}>
      {label}
      <input type={type} name={name} id={id} onChange={onChange} />
    </label>
  );
};

export default Input;
