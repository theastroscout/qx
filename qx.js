/*
 * qx JavaScript Library v0.0.1
 * https://hqmode.com/
 * Released under the MIT license
 */
(function() {
var qx = function(selector){
	let elements = document.querySelectorAll(selector);
	let items = [];
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
qx.methods = {
	// Bind functions with elements
	on: function(events,fn){
		// Determine passive
		let passiveSupported = false;
		try {
			Object.defineProperty({}, "passive", {
				get: function() {
					passiveSupported = true;
				}
			});
		} catch(e) {}
		let passive = passiveSupported?{passive:true}:false;

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
	// Adding some class or list of the class name to the element
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
	// Remove class or list of the class names
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
	// Checking elements for class name available.
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
	}
};
window.$ = qx;
});