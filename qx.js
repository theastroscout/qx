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
	// Set css to elements
	css: function(css){
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			for(var i in css){
				item.style[i] = css[i];
			}
		}
		return this;
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
		} else if(list.length){
			return list[0];
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
	},
	// Get or Set value of inputs
	val: function(v=false){
		if(v !== false){
			for(var i=0,l=this.length;i<l;i++){
				this[i].value = v;
			}
			return this;
		} else {
			let list = [];
			for(var i=0,l=this.length;i<l;i++){
				let value = this[i].value;
				if(value){
					list.push(value);
				}
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		}
	},
	// Hide elements. Set display to "none".
	hide: function(){
		for(var i=0,l=this.length;i<l;i++){
			this[i].style.display = 'none';
		}
		return this;
	},
	// Show elements. Set display to "block".
	show: function(){
		for(var i=0,l=this.length;i<l;i++){
			this[i].style.display = 'block';
		}
		return this;
	},
	// Get or Set plain text of elements
	text: function(str){
		if(typeof str == 'undefined'){
			let list = [];
			for(var i=0,l=this.length;i<l;i++){
				list.push(this[i].innerText);
				break
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		} else {
			for(var i=0,l=this.length;i<l;i++){
				this[i].innerText = str;
			}
			return this;
		}
	},
	// Get or Set HTML of elements
	html: function(html){
		if(typeof html == 'undefined'){
			let list = [];
			for(var i=0,l=this.length;i<l;i++){
				list.push(this[i].outerHTML);
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		} else {
			for(var i=0,l=this.length;i<l;i++){
				this[i].innerHTML = html;
			}
			return this;
		}
	},
	// Fade-in element using the transparency
	fadeIn: function(duration=1000, cb=false){
		for(var i=0,l=this.length;i<l;i++){
			let target = this[i];
			target.style.removeProperty('display');
			let computedStyle = window.getComputedStyle(target);
			let display = computedStyle.display;

			if (display === 'none'){
				display = 'block';
			}

			target.style.opacity = 0;
			target.style.display = display;

			setTimeout(function(){
				target.style.transition = `opacity ${duration}ms`;
				target.style.opacity = 1;
			}, 10);
			
			window.setTimeout(() => {
				target.style.removeProperty('transition');
				target.style.removeProperty('opacity');
				if(typeof cb == 'function'){
					cb(target);
				}
			}, duration);
		}
	},
	// Fade-out element using the transparency
	fadeOut: function(duration=600, cb=false){
		for(var i=0,l=this.length;i<l;i++){
			let target = this[i];
			target.style.removeProperty('display');
			let computedStyle = window.getComputedStyle(target);
			let display = computedStyle.display;

			if (display === 'none'){
				display = 'block';
			}

			target.style.opacity = 1;
			target.style.display = display;

			setTimeout(function(){
				target.style.transition = `opacity ${duration}ms`;
				target.style.opacity = 0;
			}, 10);
			
			window.setTimeout(() => {
				target.style.removeProperty('transition');
				if(typeof cb == 'function'){
					cb(target);
				}
			}, duration);
		}
	},
	// Get or Set Width of elements
	width: function(value=false){
		if(value !== false){
			let dim = (typeof value == 'number')?'px':'';
			for(var i=0,l=this.length;i<l;i++){
				this[i].style.width = value+dim;
			}
			return this;
		} else {
			let list = [];
			for(var i=0,l=this.length;i<l;i++){
				list.push(this[i].offsetWidth);
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		}
	},
	// Get or Set Height of elements
	height: function(value=false){
		if(value !== false){
			let dim = (typeof value == 'number')?'px':'';
			for(var i=0,l=this.length;i<l;i++){
				this[i].style.height = value+dim;
			}
			return this;
		} else {
			let list = [];
			for(var i=0,l=this.length;i<l;i++){
				list.push(this[i].offsetHeight);
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		}
	}
};
window.$ = qx;
});