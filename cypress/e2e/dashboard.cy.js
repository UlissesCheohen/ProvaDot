describe('CT01 - Acessar Dashboard', () => {
  it('Dado que sou Analista do RH e quero acessar meu Dashboard', () => {
    cy.login(); // Utiliza a função de login já configurada
    cy.url().should('include', '/dashboard'); // Verifica que o redirecionamento foi para o dashboard
  });
});

describe('CT02 - Acessar uma ação', () => {
  it('Dado que sou Analista do RH e desejo acessar uma ação', () => {
    cy.login(); // Realiza o login
    cy.get('.dashboard-actions') // Seletor da área de ações
      .contains('My Actions') // Identifica a ação desejada
      .click();
    cy.url().should('include', '/acao'); // Verifica se a URL foi alterada para a ação específica
  });
});

describe('CT03 - Acessar Post', () => {
  it('Dado que sou Analista do RH e desejo acessar um post', () => {
    cy.login(); // Realiza o login
    cy.get('.dashboard-posts') // Seletor de posts no dashboard
      .contains('Post') // Identifica o post desejado
      .click();
    cy.url().should('include', '/post'); // Verifica se a URL foi alterada para o post específico
  });
});

describe('CT04 - Registrar Hora', () => {
  it('Dado que sou Analista do RH e desejo registrar hora', () => {
    cy.login(); // Realiza o login
    cy.get('.time-at-work') // Seletor do quadro "Time at Work"
      .find('.clock-icon') // Seletor do ícone de relógio
      .click();
    cy.url().should('include', '/registro-horas'); // Verifica se foi redirecionado para a tela de registro de horas
    cy.get('input[name="hora_inicio"]').type('09:00'); // Digita hora de início
    cy.get('input[name="hora_fim"]').type('17:00'); // Digita hora de fim
    cy.get('button[type="submit"]').click(); // Clica no botão de adicionar
    cy.get('.confirmation-message').should('contain', 'Horas registradas com sucesso'); // Verifica mensagem de sucesso
  });
});
