class Peek {
    constructor(element) {
        this.element = element
        this.summary = this.element.querySelector('summary')
        this.peekDisplay = null
        this.peekSelector = '.peek'
        
        this.setupDisplay()
    }

    setupDisplay() {
        // create the peek target if it doesn't already exist in the dom of `this.element`
        let target = this.summary.querySelector('.peek-display')
        if (target == undefined) {
            let peekDisplayElement = document.createElement('span')
            peekDisplayElement.setAttribute('class', 'peek-display')
            target = this.summary.appendChild(peekDisplayElement)
        }

        // register the peek selector if provided
        if (this.element.dataset.peekSelector !== undefined) {
            this.peekSelector = this.element.dataset.peekSelector.toString()
        }

        this.peekDisplay = target
        this.element.addEventListener('toggle', () => { this.togglePeek() })
        this.peek()
    }

    // pull the items to show in `.peekDisplay` from the detail content
    peek() {
        this.peekDisplay.innerHTML = ''
        this.element.querySelectorAll(this.peekSelector).forEach(element => {
            this.peekDisplay.appendChild(element.cloneNode(true))
        })
    }

    // event handler
    togglePeek() {
        if (this.element.hasAttribute('open') == false) {
            this.peek()
        }
    }
}


document.addEventListener("DOMContentLoaded", function(){
    console.log('dom is ready, lets do stuff')

    document.querySelectorAll('details[data-peek]').forEach(element => {
        let p = new Peek(element)
    });

});
  