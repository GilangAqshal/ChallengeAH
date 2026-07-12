import { ReactNode } from 'react';

interface PropTypes {
  children: ReactNode;
  type?: 'submit' | 'button';
  onClick?: () => void;
  showIcon?: boolean;
}

const Button = (props: PropTypes) => {
  const { children, type = 'button', onClick } = props;
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
