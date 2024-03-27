describe('The happy way - Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Make Login', () => {
    cy.get('input[name=email]').type('george.bluth@reqres.in');
    cy.get('input[name=password]').type('anything');
    cy.get('button[type=submit]').click();

    cy.wait(3000);

    cy.get('button[aria-label="Open settings"]').click();

    // cy.get('input[type=checkbox').click();
    // cy.wait(1000);
    // cy.get('input[type=checkbox').click();
    // cy.wait(1000);
    // cy.get('input[type=checkbox').click();
    // cy.wait(1000);

    cy.contains('p', 'Logout').click();
  });
});
