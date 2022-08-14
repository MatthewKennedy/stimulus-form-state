import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  watchTargets: HTMLInputElement[] | HTMLSelectElement[] | HTMLTextAreaElement[]
  saveButtonTarget: HTMLInputElement | HTMLButtonElement
  hasSaveButtonTarget: boolean

  static targets = ['saveButton', 'watch']

  connect () {
    this.checkForChanges()
  }

  watchTargetConnected (target: HTMLInputElement | HTMLSelectElement) {
    // Auto attach the Stimulus actions to the input and select DOM elements.
    this.attachActionAttributes (target)

    // Trigger inputWatcher() as individual elements enter the DOM for Turbo Stream
    this.checkForChanges()
  }

  watchTargetDisconnect () {
    // Trigger inputWatcher() as individual elements exit the DOM for Turbo Stream
    this.checkForChanges()
  }

  checkForChanges () {
    const changeCount = []

    this.watchTargets.forEach((formEl: any) => {
      if (formEl.type === 'checkbox' || formEl.type === 'radio') {
        if (formEl.checked !== formEl.defaultChecked) changeCount.push(1)
      } else if (formEl.tagName === 'SELECT') {
        if (this.handleSelectChange(formEl) === true) changeCount.push(1)
      } else {
        if (formEl.value !== formEl.defaultValue) changeCount.push(1)
      }
    })

    if (changeCount.length > 0) {
      this.enableChangeControles()
    } else {
      this.disableChangeControles()
    }
  }

  enableChangeControles () {
    if (this.hasSaveButtonTarget) this.saveButtonTarget.disabled = false
  }

  disableChangeControles () {
    if (this.hasSaveButtonTarget) this.saveButtonTarget.disabled = true
  }

  handleSelectChange (selectEl: HTMLSelectElement) {
    let hasChanged: boolean = false
    let defaultSelected: number = 0
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

  attachActionAttributes (target: HTMLInputElement | HTMLSelectElement) {
    if (target.hasAttribute('data-action')) {
      if (target.dataset.action.includes(`${this.identifier}#checkForChanges`)) return
    }

    if (target.hasAttribute('data-action')) {
      target.setAttribute('data-action', `${this.identifier}#checkForChanges ${target.dataset.action}`)
    } else {
      target.setAttribute('data-action', `${this.identifier}#checkForChanges`)
    }
  }
}
