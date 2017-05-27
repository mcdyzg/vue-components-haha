import './responsive.css'

var install = function(){
	function adopt(){
		var docEl = document.documentElement;
		var width = docEl.clientWidth;
		docEl.style.fontSize = width/375*16+'px';
	}
	adopt()
	window.onresize = function(){
		adopt()
	}
}
export default install