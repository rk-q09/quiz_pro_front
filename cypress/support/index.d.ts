declare namespace Cypress {
  interface Chainable {
    addQuestion({ content: string }): void
  }
}
