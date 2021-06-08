import { createPortal } from 'react-dom';
import styled from 'styled-components';
const modalRoot = document.getElementById('modal');

const Modal = (props) => {
  return createPortal(
    <StyledModal>
      <section>{props.children}</section>
    </StyledModal>,
    modalRoot
  );
};

const StyledModal = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.85);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  section {
    background: ${(props) => props.theme.color.lightBckGround};
    padding: 2em;
  }
`;

export default Modal;
