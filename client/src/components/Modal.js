import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const ModalContainer = styled.div`
  width: 550px;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px black solid;
  position: absolute;
  z-index: 999;
  top: 125px;
  left: 110px;
  padding-top: 30px;
  display: flex;
  justify-content: center;

  .modal-content {
    button {
      background-color: rgba(255, 255, 255, 0.95);
      border: 0;
    }
  }
`;

const Modal = ({ closeModal, children }) => {
  return (
    <ModalContainer onClick={closeModal}>
      <div className="modal-content">
        <button onClick={(e) => e.stopPropagation()}>{children}</button>
      </div>
    </ModalContainer>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
