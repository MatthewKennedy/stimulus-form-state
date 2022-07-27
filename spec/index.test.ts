/**
 * @jest-environment jsdom
 */

import { Application } from '@hotwired/stimulus'
import FormStateController from '../src/index'

const startStimulus = (): void => {
  const application = Application.start()
  application.register('form-state', FormStateController)
}

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <form data-controller="form-state">

      <input type="text" value="xxx" id="productName" data-form-state-target="watch" >

      <button id="testButton" name="button" type="submit" data-form-state-target="submitButton" >
        Update
      </button>
    </form>
  `
})

describe('#submitButton', () => {
  it('should be disabled when form is loaded', (): void => {
    const submitButton: HTMLInputElement = document.querySelector('#testButton')

    expect(submitButton.disabled).toBe(true)
  })
})

describe('input#productName', () => {
  it('should have Stimulus action attribute added', (): void => {
    const testInput: HTMLInputElement = document.querySelector('#productName')

    expect(testInput.dataset.action).toBe('change->form-state#inputWatcher')
  })

  it('should enable submit button when changed', (): void => {
    const event = new Event("change")

    const testInput: HTMLInputElement = document.querySelector('#productName')
    const submitButton: HTMLInputElement = document.querySelector('#testButton')

    testInput.value = 'foo'
    testInput.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)
  })

  it('should revert submit button to disabled when changed back to original value', (): void => {
    const event = new Event("change")

    const testInput: HTMLInputElement = document.querySelector('#productName')
    const submitButton: HTMLInputElement = document.querySelector('#testButton')

    testInput.value = 'foo'
    testInput.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)

    testInput.value = 'xxx'
    testInput.dispatchEvent(event)

    expect(submitButton.disabled).toBe(true)
  })
})

