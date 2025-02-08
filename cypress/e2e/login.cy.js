describe('Testes de Login e Logout no OrangeHRM', () => {
    beforeEach(() => {
      // Visita a página de login antes de cada teste
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
  
    it('Deve fazer login com sucesso', () => {
      // Preenche o campo de usuário
      cy.get('input[name="username"]').type('Admin');
      // Preenche o campo de senha
      cy.get('input[name="password"]').type('admin123');
      // Clica no botão de login
      cy.get('button[type="submit"]').click();
  
      // Valida se o login foi bem-sucedido
      cy.url().should('include', '/dashboard'); // Verifica se a URL mudou para a página de dashboard
      cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard'); // Verifica se o texto "Dashboard" está visível
    });
  
    it('Não deve fazer login com credenciais inválidas', () => {
      // Preenche o campo de usuário com credenciais inválidas
      cy.get('input[name="username"]').type('UsuarioInvalido');
      cy.get('input[name="password"]').type('SenhaInvalida');
      cy.get('button[type="submit"]').click();
  
      // Valida a mensagem de erro
      cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials'); // Verifica se a mensagem de erro aparece
    });
  
    it('Deve validar campos obrigatórios', () => {
      // Tenta fazer login sem preencher os campos
      cy.get('button[type="submit"]').click();
  
      // Valida as mensagens de campo obrigatório
      cy.get('.oxd-input-field-error-message').should('contain', 'Required'); // Verifica se a mensagem "Required" aparece para ambos os campos
    });
  
    it('Deve fazer logout com sucesso', () => {
      // Faz login primeiro
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
  
      // Clica no menu de usuário
      cy.get('.oxd-userdropdown-tab').click();
      // Clica na opção de logout
      cy.contains('Logout').click();
  
      // Valida se o logout foi bem-sucedido
      cy.url().should('include', '/auth/login'); // Verifica se a URL voltou para a página de login
    });
  });