describe('Theme change flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Change and persist theme', () => {
    cy.get('input[name=email]').type('george.bluth@reqres.in');
    cy.get('input[name=password]').type('anything');
    cy.get('button[type=submit]').click();

    cy.wait(3000);

    cy.get('button[aria-label="Open settings"]').click();
    cy.wait(1000);

    cy.get('input[type=checkbox').click();
    cy.wait(1000);

    cy.get('input[type=checkbox').click();
    cy.wait(1000);

    cy.get('input[type=checkbox').click();
    cy.wait(1000);

    cy.contains('p', 'Logout').click();
    cy.wait(1000);

    cy.reload(true);
    cy.wait(1000);
  });
});
