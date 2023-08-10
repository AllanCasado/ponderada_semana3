# Aplicação Web integrada com Banco de Dados

* arquivo <b>server/index.js</b> - esse código tem basicamente quatro funções:
1. conexão com o banco de dados MySQL (obs: para que funcione é necessário alterar as credenciais de conexão com o banco)
2. configuração do servidor utilizando o framework express
3. definição dos endpoints para lidar com as ações da aplicação (cadastrar produto, listar produtos, editar produto e deletar produto)
4. inicialização do servidor

* o arquivo <b>server/public/index.html</b> define a estrutura da página web que contém basicamente:
1. um formulário para cadastro do produto (com 4 campos e um botão de submit)
2. uma lista que exibe os produtos cadastros
3. um botão de edição e deleção para cada um dos produtos
4. exibição de prompts para edição das informações de determinado produto
