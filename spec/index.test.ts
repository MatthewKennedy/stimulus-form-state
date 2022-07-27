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

      <input type="text" value="xxx" id="productName" data-form-state-target="watch">

      <textarea id="testTextarea" rows="3" data-form-state-target="watch">wonderful</textarea>

      <select id="testSelectSingle" data-form-state-target="watch">
        <option selected value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>

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

describe('input type=text', () => {
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

describe('textarea', () => {
  it('should have Stimulus action attribute added', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#testTextarea')
    expect(testEl.dataset.action).toBe('change->form-state#inputWatcher')
  })

  it('should enable submit button when changed', (): void => {
    const event = new Event("change")
    const testEl: HTMLTextAreaElement = document.querySelector('#testTextarea')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl.value = 'foo'
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)
  })

  it('should revert submit button to disabled when changed back to original value', (): void => {
    const event = new Event("change")
    const testEl: HTMLTextAreaElement = document.querySelector('#testTextarea')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl.value = 'foo'
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)

    testEl.value = 'wonderful'
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(true)
  })
})

describe('select (single no empty value)', () => {
  it('should have Stimulus action attribute added', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#testSelectSingle')
    expect(testEl.dataset.action).toBe('change->form-state#inputWatcher')
  })

  it('should enable submit button when changed', (): void => {
    const event = new Event("change")
    const testEl: HTMLTextAreaElement = document.querySelector('#testSelectSingle')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl[2].selected = true

    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)
  })

  it('should revert submit button to disabled when changed back to original value', (): void => {
    const event = new Event("change")
    const testEl: HTMLTextAreaElement = document.querySelector('#testSelectSingle')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl[2].selected = true
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)

    testEl[0].selected = true
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(true)
  })
})

