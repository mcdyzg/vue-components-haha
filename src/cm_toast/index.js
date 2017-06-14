import Vue from 'vue'
import Toast from './cm_toast.vue'

let ToastConstructor = Vue.extend(Toast)
let ToastFunction = (options = {}) => {
	if (typeof options === 'string') {
	    options = {
	      	data:{
				message: options
			}
	    };
	}else{
		options = {
			data:options
		}
	}
	let instance = new ToastConstructor(options)
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);
  	instance.vm.visible = true;
	return instance.vm;
}

export default ToastFunction
