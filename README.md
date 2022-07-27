# Stimulus Form State
[![Test](https://github.com/MatthewKennedy/stimulus-form-state/actions/workflows/test.yml/badge.svg)](https://github.com/MatthewKennedy/stimulus-form-state/actions/workflows/test.yml)
[![Lint](https://github.com/MatthewKennedy/stimulus-form-state/actions/workflows/lint.yml/badge.svg)](https://github.com/MatthewKennedy/stimulus-form-state/actions/workflows/lint.yml)

## Getting started

A Stimulus controller for tracking changes to form elements such as: `<input>`, `<select>`, `<textarea>` and many more,
allowing you to manipulate the form submit `<button>` or other DOM elements if a form has been changed from its original state.

## 📚 Documentation

### Install
```bash
yarn add stimulus-form-state
```

### Extending Controller
```javascript
// javascript/controllers/form_state_controller.js

import StimulusFormState from 'stimulus-form-state'

export default class extends StimulusFormState {

  // Override the change methods to manipulate the DOM as you wish.
  performChange () {
    // When a form element has been changed.
    document.getElementById('inputStateSubmitButton').style.display = 'inline'
    super.performChange()
  }

  revertChange () {
    // If a previously changed form element is then set back to its original state.
    document.getElementById('inputStateSubmitButton').style.display = 'none'
    super.revertChange()
  }
}

```

### In The DOM

Add `data-controller="form-state"` to the form element wrapping the elements you want to track the state of, and the submit button.

Add `data-form-state-target="watch"` to any form element you want to track state of.

Add `data-form-state-target="submitButton"` to the from submit button, by default the button will be disabled unless a watched element is changed.


## 👷‍♂️ Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## 📝 License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
