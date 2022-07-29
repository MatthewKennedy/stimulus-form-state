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

      <input type="text" value="some value" id="testTextInput" data-form-state-target="watch">

      <input type="text" value="some value" id="testTextInputWithCustomAction" data-form-state-target="watch" data-action="custom->form-state#checkForChanges">

      <textarea id="testTextarea" rows="3" data-form-state-target="watch">wonderful</textarea>

      <select id="testSelectSingle" data-form-state-target="watch">
        <option selected value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>

      <select id="testMultipleSingle" multiple data-form-state-target="watch">
        <option selected value="1">One</option>
        <option selected value="2">Two</option>
        <option value="3">Three</option>
      </select>

      <div>
        <div>
          <input type="radio" name="exampleRadios" id="testRadios1" value="option1" checked data-form-state-target="watch">
          <label for="exampleRadios1">
            Default radio
          </label>
        </div>
        <div>
          <input type="radio" name="exampleRadios" id="testRadios2" value="option2" data-form-state-target="watch">
          <label for="exampleRadios2">
            Second default radio
          </label>
        </div>
        <div>
          <input type="radio" name="exampleRadios" id="testRadios3" value="option3" data-form-state-target="watch">
          <label for="exampleRadios3">
            Third radio
          </label>
        </div>
      </div>

      <div>
        <input type="checkbox" value="" id="flexCheckDefault" data-form-state-target="watch">
        <label for="flexCheckDefault">
          Default checkbox
        </label>
      </div>
      <div>
        <input type="checkbox" value="" id="flexCheckChecked" checked data-form-state-target="watch">
        <label for="flexCheckChecked">
          Checked checkbox
        </label>
      </div>

      <button id="testButton" name="button" type="submit" data-form-state-target="saveButton" >
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

describe('input type=text with existing data-action attribute', () => {
  it('should not have the action auto added', (): void => {
    const testEl: HTMLInputElement = document.querySelector('#testTextInputWithCustomAction')
    expect(testEl.dataset.action).toBe('custom->form-state#checkForChanges')
  })
})

describe('input type=text', () => {
  it('should have the correct Stimulus action attribute added (input)', (): void => {
    const testEl: HTMLInputElement = document.querySelector('#testTextInput')
    expect(testEl.dataset.action).toBe('input->form-state#checkForChanges')
  })

  it('should enable submit button when changed', (): void => {
    const event = new Event("input")

    const testEl: HTMLInputElement = document.querySelector('#testTextInput')
    const submitButton: HTMLInputElement = document.querySelector('#testButton')

    testEl.value = 'foo'
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)
  })

  it('should revert submit button to disabled when changed back to original value', (): void => {
    const event = new Event("input")

    const testEl: HTMLInputElement = document.querySelector('#testTextInput')
    const submitButton: HTMLInputElement = document.querySelector('#testButton')

    testEl.value = 'foo'
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)

    testEl.value = 'some value'
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(true)
  })
})

describe('textarea', () => {
  it('should have the correct Stimulus action attribute added (input)', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#testTextarea')
    expect(testEl.dataset.action).toBe('input->form-state#checkForChanges')
  })

  it('should enable submit button when changed', (): void => {
    const event = new Event("input")
    const testEl: HTMLTextAreaElement = document.querySelector('#testTextarea')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl.value = 'foo'
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)
  })

  it('should revert submit button to disabled when changed back to original value', (): void => {
    const event = new Event("input")
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
  it('should have the correct Stimulus action attribute added (change)', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#testSelectSingle')
    expect(testEl.dataset.action).toBe('change->form-state#checkForChanges')
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


describe('select (multiple no empty value)', () => {
  it('should have the correct Stimulus action attribute added (change)', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#testMultipleSingle')
    expect(testEl.dataset.action).toBe('change->form-state#checkForChanges')
  })

  it('should enable submit button when changed', (): void => {
    const event = new Event("change")
    const testEl: HTMLTextAreaElement = document.querySelector('#testMultipleSingle')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl[0].selected = false
    testEl[1].selected = false

    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)
  })

  it('should revert submit button to disabled when changed back to original value', (): void => {
    const event = new Event("change")
    const testEl: HTMLTextAreaElement = document.querySelector('#testMultipleSingle')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl[2].selected = true
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(false)

    testEl[2].selected = false
    testEl.dispatchEvent(event)

    expect(submitButton.disabled).toBe(true)
  })
})


describe('radio buttons', () => {
  it('should have the correct Stimulus action attribute added (input)', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#testRadios2')
    expect(testEl.dataset.action).toBe('input->form-state#checkForChanges')
  })

  it('should enable submit button when changed', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#testRadios2')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl.click()

    expect(submitButton.disabled).toBe(false)
  })

  it('should revert submit button to disabled when changed back to original value', (): void => {
    const testEl1: HTMLTextAreaElement = document.querySelector('#testRadios1')
    const testEl2: HTMLTextAreaElement = document.querySelector('#testRadios2')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl2.click()

    expect(submitButton.disabled).toBe(false)

    testEl1.click()

    expect(submitButton.disabled).toBe(true)
  })
})

describe('checkbox', () => {
  it('should have the correct Stimulus action attribute added (input)', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#flexCheckChecked')
    expect(testEl.dataset.action).toBe('input->form-state#checkForChanges')
  })

  it('should enable submit button when changed', (): void => {
    const testEl: HTMLTextAreaElement = document.querySelector('#flexCheckChecked')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl.click()

    expect(submitButton.disabled).toBe(false)
  })

  it('should revert submit button to disabled when changed back to original value', (): void => {
    const testEl1: HTMLTextAreaElement = document.querySelector('#flexCheckDefault')
    const testEl2: HTMLTextAreaElement = document.querySelector('#flexCheckChecked')
    const submitButton: HTMLButtonElement = document.querySelector('#testButton')

    testEl2.click()

    expect(submitButton.disabled).toBe(false)

    testEl1.click()

    expect(submitButton.disabled).toBe(false)

    testEl2.click()
    testEl1.click()
    expect(submitButton.disabled).toBe(true)
  })
})
