/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(ingredientName: string): Chainable<void>;
      checkIngredientCount(ingredientName: string, count: number): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredient', (ingredientName) => {
  cy.get(`[data-cy="ingredient-${ingredientName}"]`)
    .contains('button', 'Добавить')
    .click();
});

Cypress.Commands.add('checkIngredientCount', (ingredientName, count) => {
  cy.get(`[data-cy="ingredient-${ingredientName}"]`)
    .find('div.counter p')
    .should('have.text', count.toString());
});

export {};
