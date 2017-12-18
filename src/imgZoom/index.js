import Vue from 'vue'
import imgZoom from './imgZoom.vue'


let imgZoomConstructor = Vue.extend(imgZoom)
let imgZoomFunction = (options = {}) => {
	if (typeof options === 'string') {
	    options = {
	      	data:{
				el: options
			}
	    };
	}else{
		options = {
			data:options
		}
	}
    let dom = options.data.el || document
    dom.addEventListener('click',function(e){
        let target = e.target
        if(target.nodeName !== 'IMG' || target.className === 'haha-img-zoom-item') return

        let copyDom = target.cloneNode()
        copyDom.className = 'haha-img-zoom-item'
        let instance = new imgZoomConstructor({
            data:{
                imgdom:copyDom
            }
        })
    	instance.vm = instance.$mount();
    	document.body.appendChild(instance.vm.$el);
      	instance.vm.visible = true;
    	return instance.vm;
    })

}

Vue.prototype.$imgZoom = imgZoomFunction;

export default imgZoomFunction
