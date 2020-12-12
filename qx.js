/*
 * qx JavaScript Library v0.0.1
 * https://hqmode.com/
 * Released under the MIT license
 */
(function() {
var qx = function(selector){
	let items = [];
	if(typeof selector == 'object'){
		items = qx.bind([selector]);
		return items;
	}
	let elements = document.querySelectorAll(selector);
	elements.forEach(function(currentValue, currentIndex, listObj){
		let item = currentValue;
		items.push(item);
	});
	items = qx.bind(items);
	return items;
};
qx.bind = (el) => {
	for(var i in qx.methods){
		el[i] = qx.methods[i];
	}
	return el;
};
qx.fn = {
	getPassive: () => {
		// Determine passive
		let passiveSupported = false;
		try {
			Object.defineProperty({}, "passive", {
				get: function() {
					passiveSupported = true;
				}
			});
		} catch(e) {}
		
		return passiveSupported?{passive:true}:false;
	},
	over: function(e){
		switch(e.type){
			case 'mouseenter': case 'touchstart':
				qx(this).addClass('hover');
				break;
			case 'mouseleave': case 'mousecancel': case 'touchend': case 'touchcancel':
				qx(this).removeClass('hover');
				break;
		}
	}
};
qx.ui = {
	hover: ['mouseenter', 'mouseleave', 'mousecancel', 'touchstart', 'touchend', 'touchcancel']
};
qx.methods = {
	// Adding Event Listeners to elements.
	on: function(events,fn){
		let passive = qx.fn.getPassive();

		// Split events list and add Event Listener for each
		let eventsList = events.split(' ');

		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			for(var e in eventsList){
				item.addEventListener(eventsList[e],fn,passive);
			}
		}
		return this;
	},
	// Adding the class name or list of class names to the element
	addClass: function(classNames){
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			// Split class names into an array
			let currentClassNames = (item.className.length)?item.className.split(/\s+/):[];

			if(currentClassNames.length){
				let classNameList = classNames.split(' ');
				classNames = Array.from(new Set([...currentClassNames,...classNameList])).join(' ');
			}
			item.className = classNames;
		}

		return this;
	},
	// Remove the class name or list of class names from elements classList
	removeClass: function(classNames){
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			// Split class names into an array
			let currentClassNames = (item.className.length)?item.className.split(/\s+/):[];
			if(currentClassNames.length){
				let classNameList = classNames.split(' ');
				currentClassNames = currentClassNames.filter( el => !classNameList.includes(el) );
				item.className = currentClassNames.join(' ');
			}
		}

		return this;
	},
	// Checking elements for class name available. Returning array of values if it needed.
	hasClass: function(className){
		let checkedList = [];
		for(var i=0,l=this.length;i<l;i++){
			if(this[i].classList.contains(className)){
				checkedList.push(true)
			} else {
				checkedList.push(false);
			}
		}

		if(checkedList.length > 1){
			return checkedList;
		} else if(checkedList[0]){
			return true;
		}
		return false;
	},
	// Get Attribute value of elements
	getAttr: function(attrName){
		let list = [];
		for(var i=0,l=this.length;i<l;i++){
			let attr = this[i].getAttribute(attrName);
			if(attr != null){
				if(attr == ''){
					attr = true;
				}
				list.push(attr);
			}
		}

		if(list.length > 1){
			return list;
		} else if(list[0]){
			return true;
		}
		return false;
	},
	// Set Attribute to elements
	setAttr: function(attrName,value=''){
		for(var i=0,l=this.length;i<l;i++){
			this[i].setAttribute(attrName,value);
		}
		return this;
	},
	// Remove Attribute from elements
	removeAttr: function(attrName){
		for(var i=0,l=this.length;i<l;i++){
			this[i].removeAttribute(attrName);
		}
		return this;
	},
	// Add a behavior that switches the class "hover" when you hover the mouse or tap on the element.
	hover: function(){
		let passive = qx.fn.getPassive();
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			for(var e in qx.ui.hover){
				item.addEventListener(qx.ui.hover[e],qx.fn.over,passive);
			}
		}
	},
	// Removes an element from the DOM
	remove: function(){
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			item.parentNode.removeChild(item);
		}
		return true;
	},
	// Replace element with new HTML
	replace: function(html){
		for(var i=0,l=this.length;i<l;i++){
			this[i].outerHTML = html;
		}
		return this;
	}
};
window.$ = qx;
});