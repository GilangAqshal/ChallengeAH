import { ReactNode } from 'react';
import styles from './Button.module.css';

interface PropTypes {
  children: ReactNode;
  type?: 'submit' | 'button';
  onClick?: () => void;
  showIcon?: boolean;
}

const Button = (props: PropTypes) => {
  const { children, type = 'button', onClick } = props;
  return (
    <button
      // style={{ backgroundColor: 'red', color: 'white' }}
      className={styles.button}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
