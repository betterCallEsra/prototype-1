import { slowCypressDown } from "cypress-slow-down";

slowCypressDown();

describe("LoginView", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow the user to type phone and password", () => {
    cy.get('[data-testid="phone-input"]').type("0910513968");
    cy.get('[data-testid="password-input"]').type("123456789");

    cy.get('[data-testid="phone-input"]').should("have.value", "0910513968");
    cy.get('[data-testid="password-input"]').should("have.value", "123456789");
  });

  it("should show error on failed login", () => {
    cy.intercept("POST", "/api/auth/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("loginRequest");

    cy.get('[data-testid="phone-input"]').type("wrong");
    cy.get('[data-testid="password-input"]').type("wrongpass");
    cy.get('[data-testid="sign-in-btn"]').click();

    cy.wait("@loginRequest");

    cy.get('[data-testid="error-message"]').should(
      "contain",
      "Invalid credentials"
    );
  });

  it("should redirect and store token on successful login", () => {
    const fakeToken = "FAKE_JWT_TOKEN";

    cy.intercept("POST", "/api/auth/login", {
      statusCode: 200,
      body: {
        access_token: fakeToken,
        user: {
          id: "1",
          name: "cypress test",
          phone: "0910513968",
          is_verified: true,
          role: "end user",
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
          avatar_slug: null,
          email: null,
          birth_date: null,
        },
        token_type: "Bearer",
      },
    }).as("loginRequest");

    cy.get('[data-testid="phone-input"]').type("0910513968");
    cy.get('[data-testid="password-input"]').type("123456789");
    cy.get('[data-testid="sign-in-btn"]').click();

    cy.wait("@loginRequest").then(() => {
      cy.window().then((win) => {
        expect(win.localStorage.getItem("access_token")).to.equal(fakeToken);
      });
      cy.location("pathname").should("eq", "/dashboard");
    });
  });
});
