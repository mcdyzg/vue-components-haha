import Modal from './cm_modal.vue'

Modal.install = (Vue) => {
	Vue.component(Modal.name, Modal)
}

export default Modal