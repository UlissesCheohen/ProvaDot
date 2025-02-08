// Este arquivo é carregado antes dos testes
// Pode ser usado para comandos globais ou configurações
Cypress.on('uncaught:exception', (err, runnable) => {
    return false; // Ignora erros da aplicação para não falhar o teste
  });
  