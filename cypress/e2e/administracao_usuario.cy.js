describe('Administração de Usuários no OrangeHRM', () => {
    before(() => {
      // Faz login antes de executar os testes
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard'); // Valida se o login foi bem-sucedido
    });
  
    it('Deve criar um novo usuário', () => {
      // Navega até a seção Admin
      cy.get('.oxd-sidepanel-body').contains('Admin').click();
      cy.url().should('include', '/admin/viewSystemUsers'); // Valida se está na página de gerenciamento de usuários
  
      // Clica no botão "Add" para adicionar um novo usuário
      cy.get('button').contains('Add').click();
  
      // Preenche os dados do novo usuário
      cy.get('.oxd-select-text').eq(0).click(); // Abre o dropdown de "User Role"
      cy.get('.oxd-select-dropdown').contains('Admin').click(); // Seleciona "Admin"
  
      cy.get('.oxd-select-text').eq(1).click(); // Abre o dropdown de "Status"
      cy.get('.oxd-select-dropdown').contains('Enabled').click(); // Seleciona "Enabled"
  
      cy.get('input[placeholder="Type for hints..."]').type('James Butler'); // Digita o nome do empregado
      cy.get('.oxd-autocomplete-dropdown').should('be.visible'); // Aguarda o carregamento das sugestões
      cy.get('.oxd-autocomplete-dropdown').contains('James Butler').click(); // Seleciona o empregado
  
      cy.get('input[type="text"]').eq(4).type('James.Butler'); // Digita o nome de usuário
      cy.get('input[type="password"]').eq(0).type('Senha123@'); // Digita a senha
      cy.get('input[type="password"]').eq(1).type('Senha123@'); // Confirma a senha
  
      // Clica no botão "Save" para salvar o novo usuário
      cy.get('button[type="submit"]').click();
  
      // Valida se o usuário foi criado com sucesso
      cy.get('.oxd-toast').should('contain', 'Successfully Saved'); // Verifica a mensagem de sucesso
    });
  
    it('Deve pesquisar o usuário criado', () => {
      // Navega até a seção Admin
      cy.get('.oxd-sidepanel-body').contains('Admin').click();
      cy.url().should('include', '/admin/viewSystemUsers'); // Valida se está na página de gerenciamento de usuários
  
      // Pesquisa o usuário criado
      cy.get('input[placeholder="Type for hints..."]').eq(0).type('John Doe'); // Digita o nome do empregado
      cy.get('button[type="submit"]').click();
  
      // Valida se o usuário aparece na lista
      cy.get('.oxd-table-cell').contains('john.doe').should('exist'); // Verifica se o nome de usuário está na tabela
    });
  
    it('Deve editar o usuário criado', () => {
      // Navega até a seção Admin
      cy.get('.oxd-sidepanel-body').contains('Admin').click();
      cy.url().should('include', '/admin/viewSystemUsers'); // Valida se está na página de gerenciamento de usuários
  
      // Pesquisa o usuário criado
      cy.get('input[placeholder="Type for hints..."]').eq(0).type('John Doe'); // Digita o nome do empregado
      cy.get('button[type="submit"]').click();
  
      // Clica no ícone de edição (lápis) ao lado do usuário
      cy.get('.oxd-table-cell-actions').eq(0).click();
  
      // Altera o status do usuário para "Disabled"
      cy.get('.oxd-select-text').eq(1).click(); // Abre o dropdown de "Status"
      cy.get('.oxd-select-dropdown').contains('Disabled').click(); // Seleciona "Disabled"
  
      // Clica no botão "Save" para salvar as alterações
      cy.get('button[type="submit"]').click();
  
      // Valida se o usuário foi editado com sucesso
      cy.get('.oxd-toast').should('contain', 'Successfully Updated'); // Verifica a mensagem de sucesso
    });
  
    it('Deve excluir o usuário criado', () => {
      // Navega até a seção Admin
      cy.get('.oxd-sidepanel-body').contains('Admin').click();
      cy.url().should('include', '/admin/viewSystemUsers'); // Valida se está na página de gerenciamento de usuários
  
      // Pesquisa o usuário criado
      cy.get('input[placeholder="Type for hints..."]').eq(0).type('John Doe'); // Digita o nome do empregado
      cy.get('button[type="submit"]').click();
  
      // Clica no ícone de exclusão (lixeira) ao lado do usuário
      cy.get('.oxd-table-cell-actions').eq(1).click();
  
      // Confirma a exclusão
      cy.get('.oxd-button--label-danger').click();
  
      // Valida se o usuário foi excluído com sucesso
      cy.get('.oxd-toast').should('contain', 'Successfully Deleted'); // Verifica a mensagem de sucesso
    });
  });