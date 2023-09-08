/*

QX • Lightweight JavaScript library for manipulating with HTML
Alexander Yermolenko
Surfy © https://surfy.one

*/

function QXo(items){
	this.elmts = items;
}

let QX = selector =>{

	/*

	If it's an element

	*/

	if(typeof selector === 'object'){
		if(!selector.listeners){
			selector.listeners = {};
		}
		return new QXo([selector]);
	}

	/*

	Selector

	*/

	selector = QX.fixSelector(selector);

	let itemsList = [];
	let elements = document.querySelectorAll(selector);
	elements.forEach(el => {
		if(!el.listeners){
			el.listeners = {};
		}
		itemsList.push(el);
	});

	return new QXo(itemsList);
};

QX.init = () => {
	QX.ui.setHover();
};

QX.fixSelector = selector => {
	let chunks = selector.split(',');
	for(let i=0, l=chunks.length; i<l; i++){
		chunks[i] = chunks[i].trim().replace(/^>(.*)/,':scope>$1');
	}
	return chunks.join(',');
};

/*

Functions List

*/

let fnList = {
	isTouch: 'Return True if it is a Touch Device or False if not.',
	isPassive: 'Return {passive:false} if Passive is available or False if not',
	isDark: 'Return True if the Client uses Dark Mode or False if not'
};

/*

UI

*/

QX.isTouch = () => {
	if(QX.isTouch.state === undefined){
		QX.isTouch.state = (document.documentElement && 'ontouchstart' in document.documentElement);
	}
	return QX.isTouch.state;
};

QX.isPassive = () => {
	return QX.fn.getPassive();
};

QX.isDark = () => {
	return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
};

/*

Functions

*/

QXo.fn = QXo.prototype = {

	/*

	Get element by index

	*/

	get(index = false){
		if(index === false){
			return this.elmts;
		} else if(typeof this.elmts[index] !== 'undefined'){
			return this.elmts[index];
		}
		return false;
	},

	/*

	Add Event Listeners to elements

	*/

	on(events, fn, passive){
		passive = { passive: passive || false };

		// Split events list and add Event Listener for each
		let eventsList = typeof events === 'string' ? events.split(' ') : events;

		this.each(el => {

			for(let i = 0, l = eventsList.length; i<l; i++){
				let eventName = eventsList[i];

				el.addEventListener(eventName, fn, passive);

				if(!el.listeners[eventName]){
					el.listeners[eventName] = [];
				}

				el.listeners[eventName].push({
					fn: fn,
					passive: passive
				});
			}

		});
		return this;
	},

	/*

	Remove Event Listeners from elements

	*/

	off(events, fn){

		// Split events list and add Event Listener for each
		let eventsList = events.split(' ');
		this.each(el => {
			for(let i=0, l=eventsList.length; i<l; i++){
				let eventName = eventsList[i];
				
				if(!el.listeners[eventName]){
					return true;
				}
				
				for(let [i, e] of el.listeners[eventName].entries()){
					if(!fn || e.fn === fn){
						el.listeners[eventName].splice(i, 1);
						el.removeEventListener(eventName, e.fn, e.passive);
					}
				}
			}
		});

		return this;
	},

	/*

	Add Click Listener

	*/

	click(fn, passive){
		this.on('click', fn, passive);
		return this;
	},

	/*

	Remove Click Listener

	*/

	clickOff(fn){
		this.off('click', fn);
		return this;
	},
	
	/*

	Adding the class name or list of class names to the element

	*/

	addClass(classNames){
		classNames = classNames.toString().split(' ');
		this.each(el => {
			for(let className of classNames){
				el.classList.add(className);
			}
		});

		return this;
	},

	/*

	Remove the class name or list of class names from elements classList

	*/

	removeClass(classNames){
		classNames = classNames.toString().split(' ');

		this.each(el => {
			for(let className of classNames){
				el.classList.remove(className);
			}
		});

		return this;
	},
	
	/*

	Toggle the class name in elements classList

	*/

	toggleClass(className){
		let result = [];

		this.each(el => {
			result.push(el.classList.toggle(className));
		});

		if(result.length === 1){
			return result[0];
		}

		return result;
	},

	/*

	Checking elements for class name available. Returning array of values if it needed.

	*/

	hasClass(className){
		let checkedList = [];

		this.each(el => {
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
	
	/*

	Set CSS to elements

	*/

	css(css){

		this.each(el => {
			for(let c in css){
				el.style[c] = css[c];
			}
		});

		return this;
	},
	
	/*

	Get Attribute value of elements

	*/

	getAttr(attrName){
		let list = [];
		this.each(el => {
			let attr = el.getAttribute(attrName);

			if(attr != null){
				attr = attr === '' ? true : attr;
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
	
	/*

	Set Attribute to elements

	*/

	setAttr(attrName, value=''){
		
		this.each(el => {
			el.setAttribute(attrName,value);
		});

		return this;
	},
	
	/*

	Remove Elements' Attribute

	*/

	removeAttr(attrName){

		this.each(el => {
			el.removeAttribute(attrName);
		});

		return this;
	},
	
	/*

	Add a behaviour that switches the class 'hover' when you hover the mouse or tap on the element.

	*/

	hover(type='default', passive){
		let overFunction = type === 'default' ? QX.fn.over: QX.fn.svgOver;
		this.on(QX.ui.hover, overFunction, passive);

		return this;
	},
	
	/*

	Remove 'Hover' behaviour

	*/

	hoverOff(type='default'){
		let overFunction = type === 'default' ? QX.fn.over: QX.fn.svgOver;
		this.off(QX.ui.hover, overFunction);

		return this;
	},
	
	/*

	Removes an element from the DOM

	*/

	remove(){
		this.each(el => {
			el.parentNode.removeChild(el);
		});

		return true;
	},
	
	/*

	Replace element with new HTML

	*/

	replace(html){
		this.each(el => {
			el.outerHTML = html;
		});

		return this;
	},
	
	/*

	Append HTML before End Of Elements

	*/

	append(html){
		this.each(el => {
			el.insertAdjacentHTML('beforeEnd', html);
		});

		return this;
	},
	
	/*

	Insert HTML before Beging Of Elements

	*/

	prepend(html){
		this.each(el => {
			el.insertAdjacentHTML('beforeBegin', html);
		});

		return this;
	},
	
	/*

	Insert HTML After Beging Of Elements

	*/

	afterBegin(html){
		this.each(el => {
			el.insertAdjacentHTML('afterbegin', html);
		});

		return this;
	},

	/*

	Insert HTML after the End Of Elements

	*/

	after(html){
		this.each(el => {
			el.insertAdjacentHTML('afterEnd', html);
		});

		return this;
	},

	/*

	Hide elements. Set display to 'none'

	*/

	hide(){
		this.each(el => {
			el.style.display = 'none';
		});

		return this;
	},

	/*

	Show elements. Set display to 'block'

	*/

	show(){
		this.each(el => {
			el.style.display = 'block';
		});

		return this;
	},

	/*

	Get or Set plain text of elements

	*/

	text(str=false){
		let r = QX.fn.textHtml(this.elmts, str, 'text');
		if(r === 'set'){
			return this;
		}

		return r;
	},

	/*

	Get or Set HTML of elements

	*/

	html(str=false){
		let r = QX.fn.textHtml(this.elmts, str, 'html');
		if(r === 'set'){
			return this;
		}

		return r;
	},

	/*

	Fade-in element using the transparency

	*/

	fadeIn(duration=1000, cb=false){
		QX.fn.fadeInOut(this, duration, 'fadeIn', cb);
		return this;
	},

	/*

	Fade-out element using the transparency

	*/

	fadeOut(duration=600, cb=false){
		QX.fn.fadeInOut(this, duration, 'fadeOut', cb);
		return this;
	},

	/*

	Get or Set Width of elements

	*/

	width(value=false){
		let r = QX.fn.widthHeight(this.elmts, value, 'width');
		if(r === 'set'){
			return this;
		}
		return r;
	},
	
	/*

	Get or Set Height of elements

	*/

	height(value=false){
		let r = QX.fn.widthHeight(this.elmts, value, 'height');
		if(r === 'set'){
			return this;
		}

		return r;
	},

	/*

	Executing function for each of elements

	*/

	each(cb){
		for(let i=0, l=this.elmts.length; i<l; i++){
			cb(this.elmts[i]);
		}
		return this;
	},
	
	/*

	Slide Up Elements and fade-out

	*/

	slideUp(duration=500, callback=false){
		let removeOnComplete = false;

		if(typeof duration === 'function'){
			callback = duration;
			duration = 500;
		} else if(duration === 'remove'){
			removeOnComplete = true;
			duration = 500;
		}

		this.each(el => {

			clearTimeout(el.tmo);

			if(!el.getAttribute('data-display')){
				let computedStyle = window.getComputedStyle(el);
				el.setAttribute('data-display',computedStyle.display);
			}

			el.style.transitionProperty = 'height, margin, padding, opacity';
			el.style.transitionDuration = duration + 'ms';
			el.style.boxSizing = 'border-box';
			el.style.height = el.offsetHeight + 'px';
			el.style.overflow = 'hidden';

			setTimeout(() => {
				el.style.opacity = 0;
				el.style.height = 0;
				el.style.paddingTop = 0;
				el.style.paddingBottom = 0;
				el.style.marginTop = 0;
				el.style.marginBottom = 0;
			}, 50);

			el.tmo = setTimeout( () => {
				el.style.display = 'none';
				QX.fn.removeProps(el,['opacity','box-sizing','height','padding-top','padding-bottom','margin-top','margin-bottom','overflow','transition-duration','transition-property']);
				
				if(callback){
					callback(el);
				}

				if(removeOnComplete){
					el.parentNode.removeChild(el);
				}

			}, duration + 50);
		});

		return this;
	},
	
	/*

	Slide Down Elements and fade-in

	*/

	slideDown(duration=500, callback=false){
		if(typeof duration === 'string'){
			duration = 500;
		} else if(typeof duration === 'function'){
			callback = duration;
			duration = 500;
		}
		this.each(el => {
			clearTimeout(el.tmo);
			el.style.display = 'none';
			let computedStyle = window.getComputedStyle(el);
			
			let padding = parseInt(computedStyle.paddingTop,10) + parseInt(computedStyle.paddingBottom,10);
			let opacity = computedStyle.opacity;

			el.style.overflow = 'hidden';
			el.style.opacity = 0;
			el.style.height = 0;
			el.style.paddingTop = 0;
			el.style.paddingBottom = 0;
			el.style.marginTop = 0;
			el.style.marginBottom = 0;
			el.style.boxSizing = 'border-box';
			el.style.transitionProperty = 'height, margin, padding';
			el.style.transitionDuration = duration + 'ms';

			
			el.style.display = 'block';
			let height = el.scrollHeight + padding;

			let display = el.getAttribute('data-display');
			if(display){
				el.style.display = display;
			}			

			setTimeout(() => {
				el.style.opacity = opacity;
				el.style.height = height + 'px';
				QX.fn.removeProps(el,['padding-top','padding-bottom','margin-top','margin-bottom']);
			}, 50);

			el.tmo = setTimeout( () => {
				QX.fn.removeProps(el,['opacity','box-sizing','height','overflow','transition-duration','transition-property']);

				if(callback){
					callback(el);
				}

			}, duration + 50);
		})
		return this;
	},

	/*

	Returns the size and position of elements

	*/

	getBounds(){
		let list = [];

		this.each(el => {
			let bound = {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				x: 0,
				y: 0,
				width: 0,
				height:  0
			};

			if ('getBoundingClientRect' in el){
				let rect = el.getBoundingClientRect();
				for(let p in bound){
					bound[p] = rect[p]
				}
				if(typeof bound.x === 'undefined'){
					bound.x = bound.left * 1;
					bound.y = bound.top * 1;
				}
			} else {
				bound.x = bound.left = el.offsetLeft;
				bound.y = bound.top = el.offsetTop;
				bound.x = el.offsetLeft;
				bound.y = el.offsetTop;
				bound.width = el.offsetWidth;
				bound.height = el.offsetHeight;
			}

			// Real position from top/left of the page
			bound.x += window.scrollX;
			bound.y += window.scrollY;

			list.push(bound);
		});

		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}

		return false;
	},
	
	/*

	Return the list of parent elements

	*/

	parent(className=false){
		let items = [], parentEl;
		this.each(el => {

			if(className){
				parentEl = el.closest(className);
				if(parentEl){
					items.push(parentEl);
				}
			} else {
				items.push(el.parentNode);
			}

		});

		return new QXo(items);
	},

	/*

	Return the list of elements width

	*/

	textWidth(){
		let list = [];

		this.each(el => {
			let str = el.innerText;
			let text = document.createElement('span');
			let computedStyle = window.getComputedStyle(el);
			text.innerHTML = str;
			text.style.position = 'absolute';
			text.style.visibility = 'hidden';
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

	/*

	Return Offset Top Of Elements

	*/

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

	/*

	Find elements inside the list of selected elements

	*/

	find(selector){
		let items = [];
		selector = QX.fixSelector(selector);

		this.each(el => {
			let elmts = el.querySelectorAll(selector);
			elmts.forEach(subEl => {
				if(!subEl.listeners){
					subEl.listeners = {};
				}
				items.push(subEl);
			});
		});

		return new QXo(items);
	},

	/*

	Filter

	*/

	filter(selector){

		let items = [];
		
		this.each(el => {
			if(el.matches(selector)){
				items.push(el);
			}
		});

		return new QXo(items);
	},

	/*

	Set focus at the first element of the list

	*/

	focus(){
		if(this.elmts.length){
			this.elmts[0].focus();
		}
		return this;
	},

	/*

	Return copies of elements

	*/

	copy(){
		let list = [];
		this.each(el => {
			list.push(el.cloneNode(true));
		});

		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}

		return false;
	}
};

/*

UI

*/

QX.ui = {

	hoverEvents: {
		desktop: ['mouseenter', 'mouseleave', 'mousecancel'],
		touch: ['touchstart', 'touchend', 'touchcancel']
	},

	drag: ['mousedown','touchstart'],

	setHover: () => {
		if(typeof QX.ui.hover === 'undefined'){
			QX.ui.hover = QX.isTouch() ? QX.ui.hoverEvents.touch : QX.ui.hoverEvents.desktop;
		}
	}

};

/*

Functions

*/

QX.fn = {

	getPassive: () => {
		// Determine passive
		if(typeof QX.fn.isPassive === 'undefined'){
			QX.fn.isPassive = false;

			try {
				Object.defineProperty({}, 'passive', {
					get: () => {
						QX.fn.isPassive = true;
						return true;
					}
				});
			} catch(e) {
				// continue regardless of error
			}
		}

		return QX.fn.isPassive ? { passive: false } : false;
	},

	over(e){
		switch(e.type){
			case 'mouseenter': case 'mouseover': case 'touchstart':
				this.classList.add('hover');
				break;
			case 'mouseleave': case 'mousecancel': case 'touchend': case 'touchcancel':
				this.classList.remove('hover');
				break;
		}
	},

	svgOver(e){
		switch(e.type){
			case 'mouseenter': case 'touchstart':
				QX(this).setAttr('data-hover');
				break;
			case 'mouseleave': case 'mousecancel': case 'touchend': case 'touchcancel':
				QX(this).removeAttr('data-hover');
				break;
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
			return QX.fn.prop(items, get);
		} else {
			for(i=0, l=items.length; i<l; i++){
				items[i][set] = str;
			}
			return 'set';
		}
	},

	widthHeight: (items, value=false, type='width') => {
		let i, l;
		let get, set;

		if(type === 'width'){
			get = 'offsetWidth';
			set = 'width';
		} else {
			get = 'offsetHeight';
			set = 'height';
		}

		if(value !== false){
			let dim = typeof value === 'number' ? 'px' : '';
			for(i=0, l=items.length; i<l; i++){
				items[i].style[set] = value+dim;
			}
			return 'set';
		} else {
			return QX.fn.prop(items,get);
		}
	},

	prop: (items, get) => {
		let list = [];
		for(let i=0, l=items.length; i<l; i++){
			list.push(items[i][get]);
		}

		if(list.length > 1){
			return list;
		} else if(list.length){
			return list[0];
		}

		return false;
	},

	/*

	Remove Properties

	*/
	
	removeProps: (target, props=[]) => {
		for(let i=0, l=props.length; i<l; i++){
			target.style.removeProperty(props[i]);
		}
	},

	/*

	Fade Out

	*/

	fadeInOut: (target, duration, type='fadeIn', cb) => {

		target.each(el => {
			el.style.removeProperty('display');
			let computedStyle = window.getComputedStyle(el);
			let display = computedStyle.display;

			if(display === 'none'){
				display = 'block';
			}

			el.style.opacity = type === 'fadeOut' ? 1 : 0;
			el.style.display = display;

			setTimeout(() => {
				el.style.transition = `opacity ${duration}ms`;
				el.style.opacity = type === 'fadeOut' ? 0 : 1;
			}, 10);
			
			window.setTimeout(() => {
				let r = ['transition'];
				if(type==='fadeIn'){
					r.push('opacity');
				}

				QX.fn.removeProps(el,r)

				if(typeof cb === 'function'){
					cb(el);
				}
			}, duration);
		});
	}
};

/*

Get Length of Elements

*/

Object.defineProperty(QXo.fn, 'length', {
	get(){
		return this.elmts.length;
	}
});


Object.defineProperty(QXo.fn, 'scrollWidth', {
	get(){
		let values = [];
		this.each(el => {
			values.push(el.scrollWidth);
		});

		if(values.length === 1){
			return values[0];
		} else if(values.length){
			return values;
		}
		return false;
	}
});


Object.defineProperty(QXo.fn, 'scrollHeight', {
	get(){
		let values = [];
		this.each(el => {
			values.push(el.scrollHeight);
		});

		if(values.length === 1){
			return values[0];
		} else if(values.length){
			return values;
		}
		return false;
	}
});

/*

Get value

*/

Object.defineProperty(QXo.fn, 'value', {
	get(){
		let values = [];
		this.each(el => {
			values.push(el.value);
		});

		if(values.length === 1){
			return values[0];
		} else if(values.length){
			return values;
		}
		return false;
	}
});

/*

Set Dataset

*/

Object.defineProperty(QXo.fn, 'dataset', {
	get(){
		if(this.elmts.length > 1){
			return this.elmts[0].dataset;
		}
		return this.elmts[0].dataset;
	},

	set(data){
		this.each(el => {
			for(let key in data){
				el.dataset[key] = data[key];
			}
		});
		return this;
	}
});

/*

Helper

*/

let helper = {

	get(target, key){
		
		if(key === 'list'){
			return fnList;
		}

		if (typeof target[key] === 'object' && target[key] !== null) {
			return new Proxy(target[key], validator)
		} else {
			return target[key];
		}
	},

	set(target, key, value){
		target[key] = value;
		return true
	},

	deleteProperty(target,key){
		delete target[key];
		return true;
	}
};

QX.help = new Proxy(fnList, helper)

QX.init();
window.$ = QX;

export default QX;