/// <reference types="cypress" />

const BUN_ID = '60d3b41abdacab0026a733c6';
const BUN_NAME = 'Краторная булка N-200i';
const MAIN_ID = '60d3b41abdacab0026a733c8';
const MAIN_NAME = 'Филе люминесцентного тетраодонтимформа';

describe('Страница конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

    window.localStorage.setItem('refreshToken', 'mockTestRefreshToken');
    cy.setCookie('accessToken', 'mockTestAccessToken');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Показывает заголовок конструктора', () => {
    cy.contains('Соберите бургер').should('be.visible');
  });

  it('Добавляет булку в конструктор', () => {
  cy.get('[data-cy="burger-constructor"]').as('constructor');

  cy.get('@constructor')
    .find('[data-cy="constructor-bun-top"]')
    .should('not.exist');
  cy.get('@constructor')
    .find('[data-cy="constructor-bun-bottom"]')
    .should('not.exist');

  cy.get(`[data-cy="ingredient-${BUN_ID}"]`)
    .contains('Добавить')
    .click();

  cy.get('@constructor')
    .find('[data-cy="constructor-bun-top"]')
    .should('contain', `${BUN_NAME} (верх)`);
  cy.get('@constructor')
    .find('[data-cy="constructor-bun-bottom"]')
    .should('contain', `${BUN_NAME} (низ)`);

  cy.get(`[data-cy="ingredient-${BUN_ID}"]`)
    .find('.counter')
    .should('contain', '2')
    .and('be.visible');
  });

it('Добавляет начинку в конструктор', () => {
  cy.get('[data-cy="burger-constructor"]').as('constructor');

  cy.get('@constructor')
    .find(`[data-cy="constructor-ingredient-${MAIN_ID}"]`)
    .should('not.exist');

  cy.get(`[data-cy="ingredient-${MAIN_ID}"]`)
    .contains('Добавить')
    .click();

  cy.get('@constructor')
    .find(`[data-cy="constructor-ingredient-${MAIN_ID}"]`)
    .should('exist');

  cy.get(`[data-cy="ingredient-${MAIN_ID}"]`)
    .find('.counter')
    .should('contain', '1');
  });

  describe('Модальное окно ингредиента', () => {
    it('Открывает и закрывает модальное окно ингредиента', () => {
      cy.get(`[data-cy="ingredient-${BUN_ID}"]`).click();

      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal"]').should('contain', BUN_NAME);
      
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрывает модальное окно по клику на оверлей', () => {
      cy.get(`[data-cy="ingredient-${BUN_ID}"]`).click();
      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Создаёт заказ и показывает номер', () => {
      cy.get(`[data-cy="ingredient-${BUN_ID}"]`).contains('Добавить').click();
      cy.get(`[data-cy="ingredient-${MAIN_ID}"]`).contains('Добавить').click();

      cy.get('[data-cy="burger-constructor"]').as('constructor');

      cy.contains('Оформить заказ').click();

      cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

      cy.get('[data-cy="modal"]').as('modalRoot').should('be.visible');
      cy.fixture('order.json').then(orderFixture => {
        cy.get('@modalRoot')
          .find('[data-cy="order-number"]')
          .should('contain', orderFixture.order.number.toString());
      });

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('@constructor').find('[data-cy^="constructor-ingredient"]').should('not.exist');
      cy.get('@constructor').find('[data-cy="constructor-bun-top"]').should('not.exist');
      cy.get('@constructor').find('[data-cy="constructor-bun-bottom"]').should('not.exist');
    });
  });
});
