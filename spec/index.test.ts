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

