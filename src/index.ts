import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  watchTargets: HTMLInputElement[] | HTMLSelectElement[]
  submitButtonTarget: HTMLInputElement | HTMLSelectElement

  static targets = ['submitButton', 'watch']

  connect () {
    this.inputWatcher()
  }

  watchTargetConnected (target: HTMLInputElement | HTMLSelectElement) {
    target.setAttribute('data-action', `change->${this.identifier}#inputWatcher`)

    // Trigger inputWatcher() as individual elements enter the DOM for Turbo Stream
    this.inputWatcher()
  }

  watchTargetDisconnect () {
    // Trigger inputWatcher() as individual elements exit the DOM for Turbo Stream
    this.inputWatcher()
  }

  inputWatcher () {
    const changeCount = []

    this.watchTargets.forEach((formEl: any) => {
      if (formEl.type === 'checkbox' || formEl.type === 'radio') {
        if (formEl.checked !== formEl.defaultChecked) changeCount.push(1)
      } else if (formEl.tagName === 'SELECT') {
        if (this.multiSelect(formEl) === true) changeCount.push(1)
      } else {
        if (formEl.value !== formEl.defaultValue) changeCount.push(1)
      }
    })

    if (changeCount.length > 0) {
      this.performChange()
    } else {
      this.revertChange()
    }
  }

  performChange () {
    this.submitButtonTarget.disabled = false
  }

  revertChange () {
    this.submitButtonTarget.disabled = true
  }

  multiSelect (selectEl: HTMLSelectElement) {
    let hasChanged = false
    let defaultSelected = 0
    let i: number
    let optionsCount: number
    let option: HTMLOptionElement

    for (i = 0, optionsCount = selectEl.options.length; i < optionsCount; i++) {
      option = selectEl.options[i]

      hasChanged = hasChanged || (option.selected !== option.defaultSelected)
      if (option.defaultSelected) defaultSelected = i
    }

    if (hasChanged && !selectEl.multiple) hasChanged = (defaultSelected !== selectEl.selectedIndex)
    if (hasChanged) return true
  }
}
