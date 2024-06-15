export const FlashTypes = {
  notice: 'notice',
  alert: 'alert',
}

export const FlashStyles = `
  .flash {
    position: fixed;
    top: 1em;
    right: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateX(120%);
    transition: transform 500ms;
  }
  .flash.visible {
    transform: translateX(0);
  }
  .flash--dismiss {
    font-size: 2em;
    padding: 0.5em;
  }
`

export class FlashMessage extends HTMLElement {
  static removeAfter = 5000
  timeoutId = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        ${FlashStyles}
      </style>
      <div class="flash">
        <div class="flash--message"><slot></slot></div>
        <button type="button" class="flash--dismiss" aria-label="Close" onclick="this.disconnect()">✕</button>
      </div>
    `
  }

  connectedCallback() {
    try {
      this.render()
    } catch (error) {
      console.error(error)
    } finally {
      this.timeoutId = setTimeout(() => this.disconnect(), FlashMessage.removeAfter)
    }
  }

  render() {
    this.shadowRoot.querySelector('.flash').classList.add('visible') // animate in
  }

  disconnect() {
    clearTimeout(this.timeoutId)
    this.shadowRoot.querySelector('.flash').classList.remove('visible') // animate out
    setTimeout(() => this.remove(), 500)
  }
}
