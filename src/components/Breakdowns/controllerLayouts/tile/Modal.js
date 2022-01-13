import { createPortal } from 'react-dom';

function Modal({ children }) {
  const root = document.getElementById('root');
  return createPortal(children, root);
}

export default Modal;
