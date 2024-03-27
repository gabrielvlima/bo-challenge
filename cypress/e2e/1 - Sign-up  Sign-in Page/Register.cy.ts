describe('The happy way - Register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Make Register', () => {
    cy.contains('button', 'Register here!').click();
    cy.get('input[name=email]').type('george.bluth@reqres.in');
    cy.get('input[name=password]').type('anything');
    cy.get('input[name=confirmPassword]').type('anything');
    cy.get('button[type=submit]').click();

    cy.wait(3000);

    cy.get('button[aria-label="Open settings"]').click();

    cy.contains('p', 'Logout').click();
  });
});
