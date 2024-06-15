import { FlashMessage } from "./flash_message.js"

export * from "./flash_message.js"

if (customElements.get("flash-message") === undefined) {
  customElements.define("flash-message", FlashMessage)
}
