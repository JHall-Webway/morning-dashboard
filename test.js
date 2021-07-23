var displayFromObject = function(item) {
    var keys = Object.keys(item);
    for (i=0; i< keys.length; i++) {
        var el = item['object'+i];
        var parent = document.querySelector(el.parent);
        delete el.parent;
        var displayEl = document.createElement(el.element);
        delete el.element;
        elKeys = Object.keys(el);
        for (j=0; j<elKeys.length; j++) {
            var key = elKeys[j];
            if (key === 'textContent') {
                displayEl.textContent = el[key];
            }
            else {
                displayEl.setAttribute(key, el[key])
            }
        }
        parent.appendChild(displayEl)
    }
}

var displayObjects = {
    'object0': {
        parent: 'body',
        element: 'div',
        class: 'splash-container',
        id: 'splash-container'
    },
    'object1': {
        parent: '#splash-container',
        element: 'div',
        class: 'splash',
        id: 'splash-div',
    },
    'object2': {
        parent: '#splash-div',
        element: 'h1',
        class: 'splash-head',
        id: 'splash-head',
        textContent: 'WELCOME',
    },
    'object3': {
        parent: '#splash-div',
        element: 'p',
        class: 'splash-subhead',
        id: 'splash-subhead',
        textContent: 'Please Enter Your Name and City to Continue',
    },
    'object4': {
        parent: '#splash-div',
        element: 'form',
        class: 'pure-form pure-form-stacked',
        id: 'outer-form',
    },
    'object5': {
        parent: '#outer-form',
        element: 'fieldset',
        id: 'fieldset',
    },
    'object6': {
        parent: '#fieldset',
        element: 'form',
        class: 'pure-g',
        id: 'inner-form',
    },
    'object7': {
        parent: '#inner-form',
        element: 'span',
        class: 'pure-form-message',
        id: 'form-span',
        textContent: 'This is a required field',
    },
    'object8': {
        parent: '#inner-form',
        element: 'label',
        for: 'userName',
        id: 'form-label-name',
        textContent: 'Your Name',
    },
    'object9': {
        parent: '#inner-form',
        element: 'div',
        class: 'splash-form',
        id: 'form-div-name',
    },
    'object10': {
        parent: '#form-div-name',
        element: 'input',
        type: 'text',
        id: 'name',
        placeholder: 'Name',
    },
    'object11': {
        parent: '#inner-form',
        element: 'label',
        for: 'city',
        id: 'form-label-city',
        textContent: 'City',
    },
    'object12': {
        parent: '#inner-form',
        element: 'div',
        class: 'splash-form',
        id: 'form-div-city',
    },
    'object13': {
        parent: '#form-div-city',
        element: 'input',
        type: 'text',
        id: 'city',
        placeholder: 'City',
    },
    'object14': {
        parent: '#inner-form',
        element: 'button',
        type: 'submit',
        id: 'begin-button',
        class: 'pure-button pure-button-primary',
        textContent: 'Begin',
    },
}

/* <div class="splash-container">
            <div class="splash" id="map">
                <h1 class="splash-head">WELCOME</h1>
                <p class="splash-subhead">Please Enter Your Name and City to Continue</p>
                <p>
                <form class="pure-form pure-form-stacked">
                    <fieldset>
                        <form class="pure-g">
                            <span class="pure-form-message">This is a required field.</span>
                            <label for="userName">Your Name</label>
                            <div class="splash-form">
                                <input type="text" id="name" placeholder="Name" />
                            </div>
                            <label for="city">City</label>
                            <div class="splash-form">
                                <input type="text" id="city" placeholder="City" />
                            </div>
                            </select>
                            <button type="submit" class="pure-button pure-button-primary">Begin</button>
                        </form>
                    </fieldset>
                </form>
                </p>
            </div>
            </div> */

displayFromObject(displayObjects);