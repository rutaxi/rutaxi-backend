import Modal from 'react-modal';
import ChatModal from './ChatModal';
import './Modal.css';
import LogoutContent from './LogoutModal';
import CreateModal from './CreateModal';
import DeleteModal from './DeleteModal';

function DescriptionModal({ modalIsOpen, setIsOpen, type, setIsLoggedIn }) {
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Modal
            id='description-modal'
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal" >
            {type && type == "logout" ?
                <LogoutContent closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} /> :
                (type == "create" ? <CreateModal closeModal={closeModal} /> : type == 'delete' ? <DeleteModal closeModal={closeModal} /> : <ChatModal closeModal={closeModal} />)}
        </Modal>
    );
}

export default DescriptionModal;

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1000
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
        border: 'none',
        padding: '20px', 
        maxWidth: '90%',
        maxHeight: '90%',
        boxSizing: 'border-box'
    },
};