import { connect } from 'react-redux';
import Modal from '../components/modal/Modal';
import { closeModal } from '../actions';

const mapStateToProps = state => ({
    modal: state.modal
});

const mapDispatchToProps = dispatch => ({
    onClickMask: () => dispatch(closeModal())
  })

export default connect(mapStateToProps, mapDispatchToProps)(Modal);