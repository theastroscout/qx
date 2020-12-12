var qx = function(selector){
	let elements = document.querySelectorAll(selector);
	let items = [];
	elements.forEach(function(currentValue, currentIndex, listObj){
		let item = currentValue;
		item = qx.bind(item);
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
		// Capturing the list
		if(typeof this.length != 'undefined'){
			for(var i=0,l=this.length;i<l;i++){
				this[i].on(events,fn);
			}
			return this;
		}

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
		for(var e in eventsList){
			this.addEventListener(eventsList[e],fn,passive);
		}
		return this;
	},
	// Adding some class or list of the class name to the element
	addClass: function(classNames){
		// Capturing the list
		if(typeof this.length != 'undefined'){
			for(var i=0,l=this.length;i<l;i++){
				this[i].addClass(classNames);
			}
			return this;
		}
		// Split class names into an array
		let currentClassNames = this.className.split(' ');

		if(currentClassNames.length){
			let classNameList = classNames.split(' ');
			classNames = new Set([...currentClassNames,...classNameList]).join(' ');
		}
		this.className = classNames;

		return this;
	},
	// Remove class or list of the class names
	removeClass: function(classNames){
		// Capturing the list
		if(typeof this.length != 'undefined'){
			for(var i=0,l=this.length;i<l;i++){
				this[i].removeClass(classNames);
			}
			return this;
		}
		// Split class names into an array
		let currentClassNames = this.className.split(' ');
		if(currentClassNames.length){
			let classNameList = classNames.split(' ');
			currentClassNames = currentClassNames.filter( el => !classNameList.includes(el) );
			this.className = currentClassNames.join(' ');
		}

		return this;
	},
	// Checking elements for class name available.
	hasClass: function(className){
		// For list
		if(typeof this.length != 'undefined'){
			let checkedList = [];
			for(var i=0,l=this.length;i<l;i++){
				if(this[i].classList.contains(className)){
					checkedList.push(true)
				} else {
					checkedList.push(false);
				}
			}

			return checkedList;
		}

		// For one instance
		if(this.classList.contains(className)){
			return true;
		}
		return false;
	}
};