# qx
Lightweight JavaScript library for manipulating with HTML

## Initialization
Just add the script into your HTML
> <script src="/path_to_script/qx.min.js"></script>


## Using
$(selector) - Like JQuery. Use querySelectorAll [documentation](https://developer.mozilla.org/ru/docs/Web/API/Document/querySelectorAll)


## Methods

### on()
Adding Event Listeners to elements.
```javascript
$(selector).on(eventNames,functionName);
```

### addClass()
Adding the class name or list of class names to the element.
```javascript
$(selector).addClass('className1 className2');
```

### removeClass()
Remove the class name or list of class names from elements classList.
```javascript
$(selector).removeClass('className1 className2');
```

### hasClass()
Checking elements for class name available. Returning array of values if it needed.
```javascript
$(selector).hasClass('className');
```

