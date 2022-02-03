/// <reference types="cypress" />


describe('consent screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('displays three items by default', () => {

    // arrange

    // act
    cy.contains("Data Collection Preferences").click();

    // assert
    cy.get('.toggleSwitches li').should('have.length', 3) 
    cy.get('.toggleSwitches li').first().should('have.text', ' Functionality')
    cy.get('.toggleSwitches li').last().should('have.text', ' Targeting / Advertising')
  })

  it('confirm that Deny all button work will change selections', () => {

    // arrange
    cy.contains("Data Collection Preferences").click();

    // act
    cy.get("#denyAll").click();

    // assert
    cy.document().then((doc) => {
      const checkBoxes = doc.querySelectorAll(`.toggle-switch input[type="checkbox"]`)
      checkBoxes.forEach( checkBox => {
        cy.log(`${checkBox.name}: ${checkBox.checked}`);
      })

    })


  })
})
