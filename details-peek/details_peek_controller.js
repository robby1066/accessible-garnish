// src/controllers/details_peek_controller.js

// Peek Details Controller for Stimulus (https://stimulus.hotwire.dev/)
// -----------------------
// Show a dynamic 'peek' of the content hidden in the details block.
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
//
// NOTE: This currently uses the 1.0 Stimulus data and target APIs.
// 
// Usage:
//  <details data-controller="peek-details" data-details-peek-selector=".peek" data-action="toggle->details-peek#togglePeek">
//    <summary>The summary element for the details block</summary>
//    <p>Content normally hidden until summary is clicked.</p>
//    <p class="peek">Except this. Content with the class `.peek` will be made visible.</p>
//    <ul>
//      <li><span class="peek">Peeked Content can be styled differently with CSS</span></li>
//      <li><span>A peek can highlight the most important point, leaving the rest hidden</span></li>
//      <li><span class="peek">Javascript of form interactions can be used to make the peek dynamic. It's updated every time the details element is closed</span></li>
//    </ul>
//  </details>
//
//  The attribute `data-details-peek-selector` sets the CSS selector that will be used to pluck the items out for the peek.
//  The default value is the class `.peek`, but you can use anything.
//  For example: A list of checkboxes structured like:
//    `<label><input type="checkbox" name="foo"> <span>Item Name</span></label>`
//  could have the names of checked items targeted with the selector:
//    `data-details-peek-selector="input[type=checkbox]:checked + span"`
//
//  CSS STYLING:
//  There is only one CSS rule required for Peek Details elements to behave correctly.
//  This hides the peek-display element when the details element is open.
//  DETAILS[open] SUMMARY .peek-display {
//      display: none;
//  }

import { Controller } from "stimulus"

export default class extends Controller {
    static targets = [ "summary", "peekDisplay" ]

    initialize() {
      
    }

    connect() {
        // Create the peek display area if not already present
        if (this.hasPeekDisplayTarget == false) {
            let peekDisplayElement = document.createElement('span')
            peekDisplayElement.setAttribute('class', 'peek-display')
            peekDisplayElement.setAttribute('data-target', 'details-peek.peekDisplay')
            this.summaryTarget.appendChild(peekDisplayElement)
        }

        // set the default peek selector if not already present
        if (this.hasSelectorValue == false) {
            this.selectorValue = '.peek'
        }
        if (this.data.has("selector") == false) {
            this.data.set("selector", '.peek')
        }

        // set up the initial peek
        this.peek()
    }

    get selector() {
        return this.data.get("selector")
    }

    peek() {
        // clear the `peek-display` element
        this.peekDisplayTarget.innerHTML = '' 
        
        // fill the `peek-display` element up with everything matching `selector`
        this.element.querySelectorAll(this.selector).forEach(element => {
            this.peekDisplayTarget.appendChild(element.cloneNode(true))
        })
    }
    
    togglePeek(event) {
        if (this.element.hasAttribute('open') == false) {
            this.peek()
        }
    }

}

