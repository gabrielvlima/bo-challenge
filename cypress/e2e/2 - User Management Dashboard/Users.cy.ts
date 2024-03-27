describe('User management flux', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Make Login', () => {
    cy.get('input[name=email]').type('george.bluth@reqres.in');
    cy.get('input[name=password]').type('anything');
    cy.get('button[type=submit]').click();

    cy.wait(3000);
    // Edit
    cy.get('button[aria-label="Edit"]').first().click();
    cy.wait(1000);
    cy.get('input[name=first_name]').clear().type('This is a');
    cy.get('input[name=last_name]').clear().type('New Name');
    cy.get('input[name=email]').clear().type('email@email.com');
    cy.get('button[type=submit]').click();
    cy.wait(1000);

    cy.contains('h6', 'email@email.com');

    cy.contains('h6', 'janet.weaver@reqres.in');
    // Delete
    cy.get('button[aria-label="Delete"]').eq(1).click();
    cy.wait(1000);
    cy.get('button[type=submit]').click();
    cy.wait(200);
    cy.contains('h6', 'janet.weaver@reqres.in').should('not.exist');
    cy.wait(1000);

    // Add
    cy.get('button[aria-label="add"]').click();
    cy.wait(1000);
    cy.get('input[name=first_name]').type('Anne');
    cy.get('input[name=last_name]').type('Dole');
    cy.get('input[name=email]').type('newEmail@email.com');
    cy.get('button[type=submit]').click();
    cy.wait(1000);

    cy.get('button[aria-label="Go to page 2"]').click();
    cy.wait(1000);
    cy.contains('h6', 'newEmail@email.com');
  });
});
