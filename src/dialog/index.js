import Vue from 'vue'
import Dialog from './dialog/index.js'
import Prompt from './prompt/index.js'
let DialogConstructor = Vue.extend(Dialog)
let PromptConstructor = Vue.extend(Prompt)

let handleOptions = (options = {}) =>{
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
	return options
}

let DialogWrapper = (options = {}) => {

	options = handleOptions(options)

	let instance = new DialogConstructor(options)
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);
  	instance.vm.visible = true;
	return instance.vm;
}


DialogWrapper.prompt = (options = {}) =>{

	options = handleOptions(options)

	return new Promise((resolve,reject)=>{
		options.data.resolve = resolve
		options.data.reject = reject
		let instance = new PromptConstructor(options)
		instance.vm = instance.$mount();
		document.body.appendChild(instance.vm.$el);
	  	instance.vm.visible = true;
	})
}


// 注册全局调用，不论是按需引用还是整体引用，都已经注册了
Vue.prototype.$dialog = DialogWrapper;
Vue.prototype.$prompt = DialogWrapper.prompt;

export default DialogWrapper
