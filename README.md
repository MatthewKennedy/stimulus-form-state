# Stimulus Form State
[![Test](https://github.com/MatthewKennedy/stimulus-form-state/actions/workflows/test.yml/badge.svg)](https://github.com/MatthewKennedy/stimulus-form-state/actions/workflows/test.yml)
[![Lint](https://github.com/MatthewKennedy/stimulus-form-state/actions/workflows/lint.yml/badge.svg)](https://github.com/MatthewKennedy/stimulus-form-state/actions/workflows/lint.yml)

## Getting started

A Stimulus controller for tracking changes to form elements such as: `<input>`, `<select>`, `<textarea>`
allowing you to manipulate the form submit `<button>` or other DOM elements if a form element has been changed from its original state.

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
  enableChangeControles () {
    // When a form element has been changed.
    document.getElementById('inputStateSubmitButton').style.display = 'inline'
    super.enableChangeControles()
  }

  disableChangeControles () {
    // If a previously changed form element is then set back to its original state.
    document.getElementById('inputStateSubmitButton').style.display = 'none'
    super.disableChangeControles()
  }
}
```

### In The DOM

Add `data-controller="form-state"` to the form element wrapping the elements you want to track the state of, including the submit `<button>`.

Add `data-form-state-target="watch"` to the `<select>`, `<textarea>` or `<input>` elements that you want to track state of. The correct stimulus data-action will be added to the watched element unless a preexisting data-action is present.

Add `data-form-state-target="saveButton"` to the from submit button, by default the button will be disabled unless a watched element is changed.

An example:
```html
<form data-controller="form-state" action="/customer" method="post">
  <input data-form-state-target="watch" type="text" value="Joe" name="first_name">
  <input data-form-state-target="watch" type="text" value="Blogs" name="last_name">
  <textarea data-form-state-target="watch" name="description">Some Value.</textarea>

  <button type="submit" data-form-state-target="saveButton">Save</button>
</form>
```

## 👷‍♂️ Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## 📝 License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
