# qx
Lightweight JavaScript library for manipulating with HTML

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1564069f75eb4e6aa24faef6ea43e4be)](https://www.codacy.com/gh/hqdaemon/qx/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hqdaemon/qx&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/12165/projects/15148/branches/299007/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=12165&pid=15148&bid=299007)

<br />

## Initialization
Just add the script into your HTML
```html
<script src="/path_to_script/qx.min.js"></script>
```
<br />

## Using
$(selector) - Like JQuery. Using **querySelectorAll** [documentation](https://developer.mozilla.org/ru/docs/Web/API/Document/querySelectorAll)

<br />

## Methods

### on(eventNames, function)
Adding Event Listeners to elements.
```javascript
$(selector).on(eventNames,functionName);
```

### click(function)
Adding Click Or Tap Listener to elements depending on TouchScreen Device Detected.
```javascript
$(selector).click(functionName);
```

### addClass(classNames)
Adding the class name or list of class names to the element.
```javascript
$(selector).addClass('className1 className2');
```

### removeClass(classNames)
Remove the class name or list of class names from elements classList.
```javascript
$(selector).removeClass('className1 className2');
```

### hasClass(classNames)
Checking elements for class name available. Returning array of values if it needed.
```javascript
$(selector).hasClass(className);
```

### css({properties})
Set css to elements.
```javascript
$(selector).css({prop:value});
```

### getAttr(attributeName)
Get Attribute value of elements
```javascript
$(selector).getAttr(attributeName);
```

### setAttr(attributeName)
Set Attribute to elements
```javascript
$(selector).setAttr(attributeName,value);
```

### removeAttr(attributeName)
Remove Attribute from elements
```javascript
$(selector).removeAttr(attributeName);
```

### hover()
Add a behavior that switches the class "hover" when you hover the mouse or tap on the element.
```javascript
$(selector).hover();
```

### remove()
Removes an element from the DOM
```javascript
$(selector).remove();
```

### replace(HTML)
Replace element with new HTML
```javascript
$(selector).replace(HTML);
```

### append(HTML)
Append HTML before End Of Elements
```javascript
$(selector).append(HTML);
```

### prepend(HTML)
Insert HTML before the Beging Of Elements
```javascript
$(selector).prepend(HTML);
```

### after(HTML)
Insert HTML after the End Of Elements
```javascript
$(selector).after(HTML);
```

### val(value)
Get or Set value of inputs
```javascript
$(selector).val(newValue); // Set value
$(selector).val(); // Get value
```

### hide()
Hide elements. Set display to "none".
```javascript
$(selector).hide();
```

### show()
Show elements. Set display to "block".
```javascript
$(selector).show();
```

### text()
Get or Set plain text of elements
```javascript
$(selector).text(newText); // Set text
$(selector).text(); // Get text
```

### html()
Get or Set HTML of elements
```javascript
$(selector).html(newHtml); // Set HTML inner elements
$(selector).html(); // Get Outer HTML
```

### fadeIn(duration, callback)
Fade-in element using the transparency.
```javascript
$(selector).fadeIn(duration=600,callback=false);
```

### fadeOut(duration, callback)
Fade-out element using the transparency.
```javascript
$(selector).fadeOut(duration=600,callback=false);
```

### width(value)
Get or Set Width of elements
```javascript
$(selector).width(value=false);
```

### height(value)
Get or Set Height of elements
```javascript
$(selector).height(value=false);
```

### each(function)
Executing function for each of elements
```javascript
$(selector).each(functionName);
```

### slideUp(duration, callback)
Slide Up Elements and fade-out
```javascript
$(selector).slideUp(duration=500, callback=false);
```

### slideDown(duration, callback)
Slide Down Elements and fade-in
```javascript
$(selector).slideDown(duration=500, callback=false);
```

### getBounds()
Returns the size and position of elements
```javascript
$(selector).getBounds();
```

### parent()
Return the list of parent elements
```javascript
$(selector).parent();
```

### textWidth()
Return the list of elements width
```javascript
$(selector).textWidth();
```

### top()
Return Offset Top Of Elements
```javascript
$(selector).top();
```

### find(selector)
Find elements inside the list of selected elements
```javascript
$(selector).find(selector);
```

### focus()
Set focus at the first element of the list
```javascript
$(selector).focus();
```

<br />
<br />
<br />
<br />

## MIT License

Copyright (c) 2020 HQ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.