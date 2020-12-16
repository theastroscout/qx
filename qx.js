(function(){
var qx = function(selector){
	if(typeof selector === "object"){
		return qx.bind([selector]);
	}
	var itemsList = [];
	var elements = document.querySelectorAll(selector);
	elements.forEach(function(currentValue){
		var item = currentValue;
		itemsList.push(item);
	});
	return qx.bind(itemsList);
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
				get: () => {
					passiveSupported = true;
					return true;
				}
			});
		} catch(e) {
			// continue regardless of error
		}
		
		return passiveSupported?{passive:true}:false;
	},
	isTouch: () => {
		return ("ontouchstart" in document.documentElement);
	},
	over(e){
		switch(e.type){
			case "mouseenter": case "touchstart":
				qx(this).addClass("hover");
				break;
			case "mouseleave": case "mousecancel": case "touchend": case "touchcancel":
				qx(this).removeClass("hover");
				break;
		}
	}
};
qx.ui = {
	hover: ["mouseenter", "mouseleave", "mousecancel", "touchstart", "touchend", "touchcancel"]
};
qx.methods = {
	// Adding Event Listeners to elements.
	on(events,fn){
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
	// Adding Click Or Tap Listener to elements depending on TouchScreen Device Detected.
	click(fn){
		let passive = qx.fn.getPassive();
		for(var i=0,l=this.length;i<l;i++){
			this[i].addEventListener("click",fn,passive);
		}
		return this;
	},
	// Adding the class name or list of class names to the element
	addClass(classNames){
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			// Split class names into an array
			let currentClassNames = (item.className.length)?item.className.split(/\s+/):[];

			if(currentClassNames.length){
				let classNameList = classNames.split(" ");
				classNames = Array.from(new Set([...currentClassNames,...classNameList])).join(" ");
			}
			item.className = classNames;
		}

		return this;
	},
	// Remove the class name or list of class names from elements classList
	removeClass(classNames){
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			// Split class names into an array
			let currentClassNames = (item.className.length)?item.className.split(/\s+/):[];
			if(currentClassNames.length){
				let classNameList = classNames.split(" ");
				currentClassNames = currentClassNames.filter( (el) => !classNameList.includes(el) );
				item.className = currentClassNames.join(" ");
			}
		}

		return this;
	},
	// Checking elements for class name available. Returning array of values if it needed.
	hasClass(className){
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
	css(css){
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			for(let c in css){
				item.style[c] = css[c];
			}
		}
		return this;
	},
	// Get Attribute value of elements
	getAttr(attrName){
		let list = [];
		for(var i=0,l=this.length;i<l;i++){
			let attr = this[i].getAttribute(attrName);
			if(attr != null){
				if(attr === ""){
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
	setAttr(attrName,value=""){
		for(var i=0,l=this.length;i<l;i++){
			this[i].setAttribute(attrName,value);
		}
		return this;
	},
	// Remove Attribute from elements
	removeAttr(attrName){
		for(var i=0,l=this.length;i<l;i++){
			this[i].removeAttribute(attrName);
		}
		return this;
	},
	// Add a behavior that switches the class "hover" when you hover the mouse or tap on the element.
	hover(){
		let passive = qx.fn.getPassive();
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			for(var e in qx.ui.hover){
				item.addEventListener(qx.ui.hover[e],qx.fn.over,passive);
			}
		}
	},
	// Removes an element from the DOM
	remove(){
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			item.parentNode.removeChild(item);
		}
		return true;
	},
	// Replace element with new HTML
	replace(html){
		for(var i=0,l=this.length;i<l;i++){
			this[i].outerHTML = html;
		}
		return this;
	},
	// Append HTML before End Of Elements
	append(html){
		for(var i=0,l=this.length;i<l;i++){
			this[i].insertAdjacentHTML("beforeEnd", html);
		}
		return this;
	},
	// Insert HTML before Beging Of Elements
	prepend(html){
		for(var i=0,l=this.length;i<l;i++){
			this[i].insertAdjacentHTML("beforeBegin", html);
		}
		return this;
	},
	// Insert HTML after the End Of Elements
	after(html){
		for(var i=0,l=this.length;i<l;i++){
			this[i].insertAdjacentHTML("afterEnd", html);
		}
		return this;
	},
	// Get or Set value of inputs
	val(v=false){
		var i,l;
		if(v !== false){
			for(i=0,l=this.length;i<l;i++){
				this[i].value = v;
			}
			return this;
		} else {
			let list = [];
			for(i=0,l=this.length;i<l;i++){
				let value = this[i].value;
				list.push((value)?value:false);
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
	hide(){
		for(var i=0,l=this.length;i<l;i++){
			this[i].style.display = "none";
		}
		return this;
	},
	// Show elements. Set display to "block".
	show(){
		for(var i=0,l=this.length;i<l;i++){
			this[i].style.display = "block";
		}
		return this;
	},
	// Get or Set plain text of elements
	text(str){
		var i,l;
		if(typeof str === "undefined"){
			let list = [];
			for(i=0,l=this.length;i<l;i++){
				list.push(this[i].innerText);
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		} else {
			for(i=0,l=this.length;i<l;i++){
				this[i].innerText = str;
			}
			return this;
		}
	},
	// Get or Set HTML of elements
	html(html){
		var i,l;
		if(typeof html === "undefined"){
			let list = [];
			for(i=0,l=this.length;i<l;i++){
				list.push(this[i].outerHTML);
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		} else {
			for(i=0,l=this.length;i<l;i++){
				this[i].innerHTML = html;
			}
			return this;
		}
	},
	// Fade-in element using the transparency
	fadeIn(duration=1000, cb=false){
		for(var i=0,l=this.length;i<l;i++){
			let target = this[i];
			target.style.removeProperty("display");
			let computedStyle = window.getComputedStyle(target);
			let display = computedStyle.display;

			if (display === "none"){
				display = "block";
			}

			target.style.opacity = 0;
			target.style.display = display;

			setTimeout(function(){
				target.style.transition = `opacity ${duration}ms`;
				target.style.opacity = 1;
			}, 10);
			
			window.setTimeout(() => {
				target.style.removeProperty("transition");
				target.style.removeProperty("opacity");
				if(typeof cb === "function"){
					cb(target);
				}
			}, duration);
		}
	},
	// Fade-out element using the transparency
	fadeOut(duration=600, cb=false){
		for(var i=0,l=this.length;i<l;i++){
			let target = this[i];
			target.style.removeProperty("display");
			let computedStyle = window.getComputedStyle(target);
			let display = computedStyle.display;

			if (display === "none"){
				display = "block";
			}

			target.style.opacity = 1;
			target.style.display = display;

			setTimeout(function(){
				target.style.transition = `opacity ${duration}ms`;
				target.style.opacity = 0;
			}, 10);
			
			window.setTimeout(() => {
				target.style.removeProperty("transition");
				if(typeof cb === "function"){
					cb(target);
				}
			}, duration);
		}
	},
	// Get or Set Width of elements
	width(value=false){
		var i,l;
		if(value !== false){
			let dim = (typeof value === "number")?"px":"";
			for(i=0,l=this.length;i<l;i++){
				this[i].style.width = value+dim;
			}
			return this;
		} else {
			let list = [];
			for(i=0,l=this.length;i<l;i++){
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
	height(value=false){
		var i,l;
		if(value !== false){
			let dim = (typeof value === "number")?"px":"";
			for(i=0,l=this.length;i<l;i++){
				this[i].style.height = value+dim;
			}
			return this;
		} else {
			let list = [];
			for(i=0,l=this.length;i<l;i++){
				list.push(this[i].offsetHeight);
			}
			if(list.length > 1){
				return list;
			} else if(list.length){
				return list[0];
			}
			return false;
		}
	},
	// Executing function for each of elements
	each(callback){
		for(var i=0,l=this.length;i<l;i++){
			callback(this[i]);
		}
		return this;
	},
	// Slide Up Elements and fade-out
	slideUp(duration=500, callback=false){
		let removeOnComplete = false;
		if(typeof duration === "function"){
			callback = duration;
			duration = 500;
		} else if(duration === "remove"){
			removeOnComplete = true;
			duration = 500;
		}
		for(var i=0,l=this.length;i<l;i++){
			let target = this[i];
			target.style.transitionProperty = "height, margin, padding, opacity";
			target.style.transitionDuration = duration + "ms";
			target.style.boxSizing = "border-box";
			target.style.height = target.offsetHeight + "px";
			target.style.overflow = "hidden";

			setTimeout(() => {
				target.style.opacity = 0;
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
			},10);
			window.setTimeout( () => {
				target.style.display = "none";
				target.style.removeProperty("opacity");
				target.style.removeProperty("box-sizing");
				target.style.removeProperty("height");
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				if(callback){
					callback(target);
				}
				if(removeOnComplete){
					target.parentNode.removeChild(target);
				}
			}, duration);
		}
		return this;
	},
	// Slide Down Elements and fade-in
	slideDown(duration=500, callback=false){
		if(typeof duration === "string"){
			duration = 500;
		} else if(typeof duration === "function"){
			callback = duration;
			duration = 500;
		}
		for(var i=0,l=this.length;i<l;i++){
			let target = this[i];
			target.style.removeProperty("display");
			let computedStyle = window.getComputedStyle(target);
			let display = computedStyle.display;

			if(display === "none"){
				display = "block";
			}

			let opacity = computedStyle.opacity;

			target.style.display = display;
			let height = target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.opacity = 0;
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.style.boxSizing = "border-box";
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";

			setTimeout(() => {
				target.style.opacity = opacity;
				target.style.height = height + "px";
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
			}, 10);
			window.setTimeout( () => {
				target.style.removeProperty("opacity");
				target.style.removeProperty("box-sizing");
				target.style.removeProperty("height");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				if(callback){
					callback(target);
				}
			}, duration);
		}
		return this;
	},
	// Returns the size and position of elements
	getBounds(){
		let list = [];
		for(var i=0,l=this.length;i<l;i++){
			let target = this[i];
			let bound = {};
			if ("getBoundingClientRect" in target){
				bound = target.getBoundingClientRect();
				if(typeof bound.x === "undefined"){
					bound.x = bound.left;
					bound.y = bound.top;
				}
			} else {
				bound.x = target.offsetLeft;
				bound.y = target.offsetTop;
				bound.width = target.offsetWidth;
				bound.height = target.offsetHeight;
			}
			list.push(bound);
		}
		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Return the list of parent elements
	parent(){
		let items = [];
		for(var i=0,l=this.length;i<l;i++){
			items.push(this[i].parentNode);
		}
		return qx.bind(items);
	},
	// Return the list of elements width
	textWidth(){
		let list = [];
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			let str = item.innerText;
			let text = document.createElement("span");
			let computedStyle = window.getComputedStyle(item);
			text.innerHTML = str;
			text.style.position = "absolute";
			text.style.visibility = "hidden";
			text.style.font = computedStyle.font;
			document.body.appendChild(text); 
			let width = text.offsetWidth;
			document.body.removeChild(text);

			list.push(width);
		}

		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Return Offset Top Of Elements
	top(){
		let list = [];
		for(var i=0,l=this.length;i<l;i++){
			list.push(this[i].offsetTop);
		}
		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Find elements inside the list of selected elements
	find(selector){
		let items = [];
		for(var i=0,l=this.length;i<l;i++){
			let elmts = this[i].querySelectorAll(selector);
			elmts.forEach((currentValue) => {
				items.push(currentValue);
			});
		}
		return qx.bind(items);
	},
	// Set focus at the first element of the list
	focus(){
		if(this.length){
			this[0].focus();
		}
		return this;
	},
	counter(options){
		let go = false;
		for(var i=0,l=this.length;i<l;i++){
			let item = this[i];
			if(typeof options.count != "object"){
				options.count = [parseFloat(item.innerText), options.count];
			}
			
			if(typeof options.duration === "undefined"){
				options.duration = 1000;
			}
			var steps = options.duration/50;
			let offset = (options.count[1] - options.count[0])/steps;
			// console.log(options.count)
			if(typeof options.current === "undefined"){
				if(item.tmo){
					clearTimeout(item.tmo);
				}
				options.current = options.count[0];
			} else {
				options.current += offset;
			}
			let v = options.current;
			if(options.current >= options.count[1]){
				v = options.count[1];
			}
			if(options.round){
				v = v.toFixed(options.round);
			}
			if(options.mask){
				v = options.mask.replace(/n/,v);
			}
			
			if(options.current >= options.count[1]){
				item.innerText = v;
			} else {
				item.innerText = v;
				go = true;
			}
		}

		if(go){
			let that = this;
			setTimeout(() => {
				that.counter(options);
			}, 50)
		}
		return this;
	}
};
window.$ = qx;
})();