describe("LoginView E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("logs in successfully and redirects to dashboard", () => {
    cy.get('[data-testid="email-input"]').type("test@test.com");
    cy.get('[data-testid="password-input"]').type("secure101");
    cy.get('[data-testid="sign-in-btn"]').click();

    cy.url().should("include", "/dashboard");
  });

  it("shows an error message on failed login", () => {
    cy.get('[data-testid="email-input"]').type("wrong@example.com");
    cy.get('[data-testid="password-input"]').type("wrongpass");
    cy.get('[data-testid="sign-in-btn"]').click();

    cy.contains("Invalid email or password").should("be.visible");
  });
});
