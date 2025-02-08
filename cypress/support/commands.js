Cypress.Commands.add('login', () => {
  console.log('Executando o comando de login'); // Verifica se o comando é carregado corretamente
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();
});
