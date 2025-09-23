/// <reference types="cypress" />

describe('Authenticated Photo Album Search Functionality', () => {

  beforeEach(() => {
    // 1. Navigate to the landing page
    cy.visit('http://localhost:5173/');

    // 2. Click the login button to go to login page
    cy.contains('Login').click();

    // 3. Enter valid credentials
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
  cy.get('button[type="submit"]').click();

  // Force navigation to /home after login
  cy.visit('http://localhost:5173/home');
  cy.url().should('include', '/home');

  // Click 'view albums' link to open albums using id
  cy.get('#view-albums-link').click();
  cy.url().should('include', '/album');
  cy.contains('Local Photo Gallery').should('be.visible');
  });

  // Test case for a successful search with valid results
  it('should display correct photos when searching for "Kenya"', () => {
    // The test starts here, already authenticated on the album page
    const searchTerm = 'Kenya';
    cy.get('input[placeholder="Search by title, photographer, or country..."]').type(searchTerm);

    cy.get('button[type="submit"]').click();

    cy.get('.break-inside-avoid-column')
      .should('have.length.greaterThan', 0)
      .each(($card) => {
        cy.wrap($card).find('span').contains(searchTerm).should('be.visible');
      });
  });

  // Test case for a search that yields no results
  it('should display a "No photos found" message for an invalid search', () => {
    const invalidSearchTerm = 'Invalid Search Term 12345';
    cy.get('input[placeholder="Search by title, photographer, or country..."]').type(invalidSearchTerm);

    cy.get('button[type="submit"]').click();

    cy.get('div.text-center.text-gray-500.text-lg.p-4')
      .should('be.visible')
      .and('contain.text', `No photos found for "${invalidSearchTerm}".`);
  });
});
