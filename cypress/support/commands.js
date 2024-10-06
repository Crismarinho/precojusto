Cypress.Commands.add('CPFgerado', function(){
cy.get('input[type="radio"][name="pontuacao"][id="pontuacao_nao"][value="N"]').check();
cy.get('#cpf_estado').select('AM');
cy.get('#bt_gerar_cpf').click();
})
