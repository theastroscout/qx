(() => {
var qx = (selector) =>{
	if(typeof selector === "object"){
		return new qxo([selector]);
	}
	var itemsList = [];
	var elements = document.querySelectorAll(selector);
	elements.forEach((currentValue) => {
		itemsList.push(currentValue);
	});
	return new qxo(itemsList);
};

var qxo = function(items){
	this.elmts = items;
};

qxo.fn = qxo.prototype = {
	// Get
	get(index = false){
		if(index === false){
			return this.elmts;
		} else if(typeof this.elmts[index] !== 'undefined'){
			return this.elmts[index];
		}
		return false;
	},
	// Adding Event Listeners to elements.
	on(events,fn){
		let passive = qx.fn.getPassive();

		// Split events list and add Event Listener for each
		let eventsList = events.split(' ');
		this.each((el) => {
			for(var e in eventsList){
				el.addEventListener(eventsList[e],fn,passive);
			}
		});
		return this;
	},
	// Adding Click Or Tap Listener to elements depending on TouchScreen Device Detected.
	click(fn){
		let passive = qx.fn.getPassive();
		this.each((el) => {
			el.addEventListener("click",fn,passive);
		});
		return this;
	},
	// Adding the class name or list of class names to the element
	addClass(classNames){
		qx.fn.parseClasses(this.elmts,classNames,(item,classNames,currentClassNames) => {
			classNames = Array.from(new Set([...currentClassNames,...classNames])).join(" ");
			item.className = classNames;
		});
		return this;
	},
	// Remove the class name or list of class names from elements classList
	removeClass(classNames){
		qx.fn.parseClasses(this.elmts,classNames,(item,classNames,currentClassNames) => {
			currentClassNames = currentClassNames.filter( (el) => !classNames.includes(el) );
			item.className = currentClassNames.join(" ");
		});
		return this;
	},
	// Checking elements for class name available. Returning array of values if it needed.
	hasClass(className){
		let checkedList = [];
		this.each((el) => {
			if(el.classList.contains(className)){
				checkedList.push(true)
			} else {
				checkedList.push(false);
			}
		});

		if(checkedList.length > 1){
			return checkedList;
		} else if(checkedList[0]){
			return true;
		}
		return false;
	},
	// Set css to elements
	css(css){
		for(var i=0,l=this.elmts.length;i<l;i++){
			let item = this.elmts[i];
			for(let c in css){
				item.style[c] = css[c];
			}
		}
		return this;
	},
	// Get Attribute value of elements
	getAttr(attrName){
		let list = [];
		this.each((el) => {
			let attr = el.getAttribute(attrName);
			if(attr != null){
				attr = (attr === "")?true:false;
			} else if(attr === null){
				attr = false;
			}
			list.push(attr);
		});

		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	// Set Attribute to elements
	setAttr(attrName,value=""){
		this.each((el) => {
			el.setAttribute(attrName,value);
		});
		return this;
	},
	// Remove Attribute from elements
	removeAttr(attrName){
		this.each((el) => {
			el.removeAttribute(attrName);
		});
		return this;
	},
	// Add a behavior that switches the class "hover" when you hover the mouse or tap on the element.
	hover(){
		let passive = qx.fn.getPassive();
		this.each((el) => {
			for(var e in qx.ui.hover){
				el.addEventListener(qx.ui.hover[e],qx.fn.over,passive);
			}
		});
		return this;
	},
	// Removes an element from the DOM
	remove(){
		this.each((el) => {
			el.parentNode.removeChild(el);
		});
		return true;
	},
	// Replace element with new HTML
	replace(html){
		this.each((el) => {
			el.outerHTML = html;
		});
		return this;
	},
	// Append HTML before End Of Elements
	append(html){
		this.each((el) => {
			el.insertAdjacentHTML("beforeEnd", html);
		});
		return this;
	},
	// Insert HTML before Beging Of Elements
	prepend(html){
		this.each((el) => {
			el.insertAdjacentHTML("beforeBegin", html);
		});
		return this;
	},
	// Insert HTML after the End Of Elements
	after(html){
		this.each((el) => {
			el.insertAdjacentHTML("afterEnd", html);
		});
		return this;
	},
	// Get or Set value of inputs
	val(v=false){
		if(v !== false){
			this.each((el) => {
				el.value = v;
			});
			return this;
		} else {
			let list = [];
			this.each((el) => {
				list.push((el.value)?el.value:false);
			});
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
		this.each((el) => {
			el.style.display = "none";
		});
		return this;
	},
	// Show elements. Set display to "block".
	show(){
		this.each((el) => {
			el.style.display = "block";
		});
		return this;
	},
	// Get or Set plain text of elements
	text(str=false){
		let r = qx.fn.textHtml(this.elmts,str,'text');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Get or Set HTML of elements
	html(str=false){
		let r = qx.fn.textHtml(this.elmts,str,'html');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Fade-in element using the transparency
	fadeIn(duration=1000, cb=false){
		qx.fn.fadeInOut(this,duration,"fadeIn",cb);
		return this;
	},
	// Fade-out element using the transparency
	fadeOut(duration=600, cb=false){
		qx.fn.fadeInOut(this,duration,"fadeOut",cb);
		return this;
	},
	// Get or Set Width of elements
	width(value=false){
		let r = qx.fn.widthHeight(this.elmts,value,'width');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Get or Set Height of elements
	height(value=false){
		let r = qx.fn.widthHeight(this.elmts,value,'height');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	// Executing function for each of elements
	each(cb){
		for(let i=0,l=this.elmts.length;i<l;i++){
			cb(this.elmts[i]);
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
		this.each((el) => {
			clearTimeout(el.tmo);
			el.style.transitionProperty = "height, margin, padding, opacity";
			el.style.transitionDuration = duration + "ms";
			el.style.boxSizing = "border-box";
			el.style.height = el.offsetHeight + "px";
			el.style.overflow = "hidden";

			setTimeout(() => {
				el.style.opacity = 0;
				el.style.height = 0;
				el.style.paddingTop = 0;
				el.style.paddingBottom = 0;
				el.style.marginTop = 0;
				el.style.marginBottom = 0;
			},50);
			el.tmo = setTimeout( () => {
				el.style.display = "none";
				qx.fn.removeProps(el,["opacity","box-sizing","height","padding-top","padding-bottom","margin-top","margin-bottom","overflow","transition-duration","transition-property"]);
				if(callback){
					callback(el);
				}
				if(removeOnComplete){
					el.parentNode.removeChild(el);
				}
			}, duration+50);
		});
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
		this.each((el) => {
			clearTimeout(el.tmo);
			qx.fn.removeProps(el,["display"]);
			let computedStyle = window.getComputedStyle(el);
			let display = computedStyle.display;

			if(display === "none"){
				display = "block";
			}

			let padding = parseInt(computedStyle.paddingTop,10) + parseInt(computedStyle.paddingBottom,10);

			let opacity = computedStyle.opacity;

			el.style.overflow = "hidden";
			el.style.opacity = 0;
			el.style.height = 0;
			el.style.paddingTop = 0;
			el.style.paddingBottom = 0;
			el.style.marginTop = 0;
			el.style.marginBottom = 0;
			el.style.boxSizing = "border-box";
			el.style.transitionProperty = "height, margin, padding";
			el.style.transitionDuration = duration + "ms";
			el.style.display = display;

			let height = el.scrollHeight + padding;

			setTimeout(() => {
				el.style.opacity = opacity;
				el.style.height = height + "px";
				qx.fn.removeProps(el,["padding-top","padding-bottom","margin-top","margin-bottom"]);
			}, 50);
			el.tmo = setTimeout( () => {
				qx.fn.removeProps(el,["opacity","box-sizing","height","overflow","transition-duration","transition-property"]);
				if(callback){
					callback(el);
				}
			}, duration+50);
		})
		return this;
	},
	// Returns the size and position of elements
	getBounds(){
		let list = [];
		this.each((el) => {
			let bound = {};
			if ("getBoundingClientRect" in el){
				bound = el.getBoundingClientRect();
				if(typeof bound.x === "undefined"){
					bound.x = bound.left;
					bound.y = bound.top;
				}
			} else {
				bound.x = el.offsetLeft;
				bound.y = el.offsetTop;
				bound.width = el.offsetWidth;
				bound.height = el.offsetHeight;
			}
			list.push(bound);
		});
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
		this.each((el) => {
			items.push(el.parentNode);
		});
		return new qxo(items);
	},
	// Return the list of elements width
	textWidth(){
		let list = [];

		this.each((el) => {
			let str = el.innerText;
			let text = document.createElement("span");
			let computedStyle = window.getComputedStyle(el);
			text.innerHTML = str;
			text.style.position = "absolute";
			text.style.visibility = "hidden";
			text.style.font = computedStyle.font;
			document.body.appendChild(text); 
			let width = text.offsetWidth;
			document.body.removeChild(text);

			list.push(width);
		});

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
		this.each((el) => {
			list.push(el.offsetTop);
		});
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
		this.each((el) => {
			let elmts = el.querySelectorAll(selector);
			elmts.forEach((currentValue) => {
				items.push(currentValue);
			});
		});
		return new qxo(items);
	},
	// Set focus at the first element of the list
	focus(){
		if(this.elmts.length){
			this.elmts[0].focus();
		}
		return this;
	},
	counter(options){
		let go = false;
		this.each((el) => {
			if(typeof options.count != "object"){
				options.count = [parseFloat(el.innerText), options.count];
			}
			
			if(typeof options.duration === "undefined"){
				options.duration = 1000;
			}
			var steps = options.duration/50;
			let offset = (options.count[1] - options.count[0])/steps;
			// console.log(options.count)
			if(typeof options.current === "undefined"){
				if(el.tmo){
					clearTimeout(el.tmo);
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
				el.innerText = v;
			} else {
				el.innerText = v;
				go = true;
			}
		});

		if(go){
			let that = this;
			setTimeout(() => {
				that.counter(options);
			}, 50)
		}
		return this;
	}
};
qx.ui = {
	hover: ["mouseenter", "mouseleave", "mousecancel", "touchstart", "touchend", "touchcancel"]
};
qx.fn = {
	isPassive: null,
	getPassive: () => {
		// Determine passive
		if(qx.fn.isPassive === null){
			qx.fn.isPassive = false;
			try {
				Object.defineProperty({}, "passive", {
					get: () => {
						qx.fn.isPassive = true;
						return true;
					}
				});
			} catch(e) {
				// continue regardless of error
			}
		}
			
		return qx.fn.isPassive?{passive:true}:false;
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
	},
	parseClasses: (items,classNames,cb) => {
		classNames = classNames.split(" ");
		for(var i=0,l=items.length;i<l;i++){
			let item = items[i];
			let currentClassNames = (item.className.length)?item.className.split(/\s+/):[];
			cb(item,classNames,currentClassNames);
		}				
	},
	textHtml: (items,str,type='html') => {
		let i,l;
		let get,set;
		if(type==='html'){
			get = 'outerHTML';
			set = 'innerHTML';
		} else {
			get = set = 'innerText';
		}

		if(str === false){
			return qx.fn.prop(items,get);
		} else {
			for(i=0,l=items.length;i<l;i++){
				items[i][set] = str;
			}
			return 'set';
		}
	},
	widthHeight: (items,value=false,type='width') => {
		let i,l;
		let get,set;
		if(type === 'width'){
			get = 'offsetWidth';
			set = 'width';
		} else {
			get = 'offsetHeight';
			set = 'height';
		}
		if(value !== false){
			let dim = (typeof value === "number")?"px":"";
			for(i=0,l=items.length;i<l;i++){
				items[i].style[set] = value+dim;
			}
			return 'set';
		} else {
			return qx.fn.prop(items,get);
		}
	},
	prop: (items,get) => {
		let list = [];
		for(let i=0,l=items.length;i<l;i++){
			list.push(items[i][get]);
		}
		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}
		return false;
	},
	removeProps: (target,props=[]) => {
		for(let i=0,l=props.length;i<l;i++){
			target.style.removeProperty(props[i]);
		}
	},
	fadeInOut: (target,duration,type="fadeIn",cb) => {
		target.each((el) => {
			el.style.removeProperty("display");
			let computedStyle = window.getComputedStyle(el);
			let display = computedStyle.display;

			if (display === "none"){
				display = "block";
			}

			el.style.opacity = (type==="fadeOut")?1:0;
			el.style.display = display;

			setTimeout(function(){
				el.style.transition = `opacity ${duration}ms`;
				el.style.opacity = (type==="fadeOut")?0:1;
			}, 10);
			
			window.setTimeout(() => {
				let r = ["transition"];
				if(type==="fadeIn"){
					r.push("opacity");
				}
				qx.fn.removeProps(el,r)

				if(typeof cb === "function"){
					cb(el);
				}
			}, duration);
		});
	}
}

Object.defineProperty(qxo.fn, 'length', {
	get(){
		return this.elmts.length;
	}
});
window.$ = qx;
})();