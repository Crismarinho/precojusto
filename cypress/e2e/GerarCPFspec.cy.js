import { onCLS } from 'web-vitals';

// Exemplo de uso do onCLS fora do teste
onCLS((metric) => {
  console.log('Cumulative Layout Shift (CLS) metric:', metric);
});

describe('Gerar CPF', () => {
  beforeEach(() => {
    //Aqui está acessando a página
    cy.visit('https://www.4devs.com.br/gerador_de_cpf')
    cy.intercept('POST', 'https://shb.richaudience.com/hb/', {
      statusCode: 200,
      body: {}
    }).as('blockedRequest');

    // Aqui ignora erros não capturados
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.log('Erro capturado:', err);
      return false; // Retorna false para não falhar o teste
    });
  });

  it('Usuário gera CPF sem ponto', () => {
    // Aqui seleciona a opção gerar CPF sem pontuação
    cy.get('input[id="pontuacao_nao"][value="N"]').check();

    // Aqui seleciona o estado de origem
    cy.get('#cpf_estado').select('AM');

    // Aqui usuário clica no botão para gerar o CPF
    cy.get('#bt_gerar_cpf').click();
    //
    cy.get('#texto_cpf').should('be.visible');
  })

  it.only('Deve continuar gerando CPF até número começar com "7"', function () {
    cy.get('[id="pontuacao_nao"][value="N"]').check();
    cy.get('#cpf_estado').select('AM');

    const gerarEValidarCPF = () => {
      cy.get('#bt_gerar_cpf').click({ force: true });
      cy.get('#texto_cpf').invoke('text').then((cpfGerado) => {

        // Verifica se o CPF começa com '7'
        if (cpfGerado.startsWith('7')) {
          // Se o CPF começar com '7', o teste é concluído com sucesso
          cy.log(`CPF encontrado: ${cpfGerado}`);
          cy.wrap(cpfGerado).should('match', /^7/); // Validação final para garantir que começa com '7'
        }
        else {// Se não começar com '7', chama a função novamente
          gerarEValidarCPF(); // Chama a função recursivamente
        }
      });
    };

    // Inicia a geração de CPF
    gerarEValidarCPF();
  });

});






