import '@testing-library/cypress/add-commands'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('startGame', async () => {
  await cy.findByText('start game').click()
})

Cypress.Commands.add('gameplayStalemate', () => {
  cy.findAllByRole('button').then(async (buttons) => {
    const [column1, column2, column3, column4, column5, column6, column7] =
      buttons

    // fill column 1 up
    await column1.click()
    await column1.click()
    await column1.click()
    await column1.click()
    await column1.click()
    await column1.click()
    await column1.click()

    // fill column 2 up
    await column2.click()
    await column2.click()
    await column2.click()
    await column2.click()
    await column2.click()
    await column2.click()
    await column2.click()

    await column3.click()
    await column4.click()
    //   // fill column4 up
    await column4.click()
    await column4.click()
    await column4.click()
    await column4.click()
    await column4.click()
    await column4.click()

    await column3.click()
    await column3.click()
    await column3.click()
    await column3.click()
    await column3.click()
    await column3.click()
    await column3.click()

    await column5.click()
    await column5.click()
    await column5.click()
    await column5.click()
    await column5.click()
    await column5.click()
    await column5.click()

    await column6.click()
    await column6.click()
    await column6.click()
    await column6.click()
    await column6.click()
    await column6.click()
    await column6.click()

    await column7.click()
    await column7.click()
    await column7.click()
    await column7.click()
    await column7.click()
    await column7.click()
    await column7.click()
  })
})

Cypress.Commands.add('fillColumn', () => {
  cy.findAllByRole('button').then(async (buttons) => {
    const [column1, column2, column3, column4, column5, column6, column7] =
      buttons

    // fill column 1 up
    await column1.click()
    await column1.click()
    await column1.click()
    await column1.click()
    await column1.click()
    await column1.click()
    await column1.click()
  })
})
