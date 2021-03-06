import 'es6-promise/auto'
import * as Game from './game'
import { Board } from './board'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas')
  if (!canvas) {
    console.error('Canvas DOM is null')
    return
  }
  const board = new Board(canvas)
  board.render()

  if (!('publishServer' in navigator)) {
    const flywebOptionInput = document.querySelector(
      '.mode-chooser-input-flyweb'
    )
    if (flywebOptionInput) {
      flywebOptionInput.setAttribute('disabled', 'disabled')
    }
  }

  const modeChooser = document.querySelector('.mode-chooser-submit')
  if (modeChooser) {
    modeChooser.addEventListener('click', () => {
      const modeDOM = document.querySelector('.mode')
      if (modeDOM) {
        const modeInputDOMs = <NodeListOf<
          HTMLInputElement
        >>document.querySelectorAll('.mode-chooser-input')
        let chosenMode = null
        for (let i = 0; i < modeInputDOMs.length; i++) {
          chosenMode = modeInputDOMs[i].checked ? modeInputDOMs[i].value : null
          if (chosenMode) {
            break
          }
        }
        if (!chosenMode) {
          chosenMode = 'offline-ai'
        }
        if (chosenMode === 'offline-human') {
          Game.initGameLocal2p()
        } else if (chosenMode === 'local-flyweb') {
          Game.initGameFlyweb({ clientMode: false })
        } else if (chosenMode === 'offline-ai') {
          Game.initGameLocalAi()
        }

        modeDOM.classList.add('invisible')
        modeDOM.addEventListener('transitionend', () => {
          modeDOM.classList.add('hidden')
        })
      }
    })
  }
})
