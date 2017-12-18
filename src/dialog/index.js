import Vue from 'vue'
import Dialog from './dialog.vue'


let DialogConstructor = Vue.extend(Dialog)
let DialogFunction = (options = {}) => {
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
	let instance = new DialogConstructor(options)
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);
  	instance.vm.visible = true;
	return instance.vm;
}

Vue.prototype.$dialog = DialogFunction;

export default DialogFunction
