# RamenGo - Documentação Técnica 🍜

Este projeto foi um desafio técnico cujo objetivo é criar uma aplicação que permita que um usuário faça o pedido de um ramen. O usuário deve selecionar um dos condimentos (broths) e uma das proteínas (proteins) e, ao enviar seu pedido, deve receber uma mensagem dizendo que o pedido foi realizado e está sendo preparado. Os dados dos ingredientes devem ser requisitados via API e o envio do pedido deve ser feito via método POST pela API fornecida. Além disso, também é necessário seguir o design e style guide proporcionado via Figma.

## Como visualizar o projeto
Este projeto está hospedado via Netflify e pode ser acesso por [este link aqui ↗️](https://ramengo-amdfd.netlify.app/).

## Como executar o projeto localmente
Para executar o projeto localmente, siga os passos:

1. Faça um clone deste repositório usando o comando `git clone https://github.com/amdfd/RamenGo.git`
2. Abra a pasta do repositório no seu editor de código de preferência e adicione sua `API_KEY` no arquivo `api.js`. Deve ficar assim: `API_KEY: <minhaChaveDeAPI>`
3. No terminal, execute o comando `npm i` para que o npm instale todas as dependências necessárias (nesse caso é somente o Webpack)
4. Após as dependências terem sido instaladas, certifique-se de estar na branch `main` e execute o comando `npm run build` no terminal. Caso não esteja na branch main, execute o comando `git branch main` e você será direcionado
5. Pronto! Você já está executando o projeto e, para vê-lo no navegador, basta abrir o arquivo `index.html` com o seu navegador de preferência 🎉

## O processo de desenvolvimento

### Requisitos técnicos
- Não é permitido utilizar nenhuma biblioteca ou framework de JavaScript e nem de CSS
- É permitido utilizar pré-processadores CSS e ferramentas como Webpack, Vite, etc
- A lista de condimentos e a lista de proteínas deve ser requisitada via API providenciada
- O pedido deve ser enviado via POST com a requisição no Body para a API providenciada

### Planejamento
- Iniciei o planejamento das tarefas utilizando um board Kanban no Trello, que [está disponível aqui ↗️](https://trello.com/b/yurl9n3N/ramengo)
  - Na coluna de *backlog* listei todas as tarefas já divididas em partes
  - Na coluna de *to do*, coloquei as tarefas refinadas (com detalhes na descrição e pontos de atenção) para serem desenvolvidas
  - A coluna *doing* representa que a tarefa está em andamento
  - A coluna *code review* indica que o PR está aberto na branch develop e precisa de revisão antes de ser mergeado com a branch main
  - Já em *testing*, considerei os testes feitos no ambiente de produção (inicialmente via Github Pages e depois no Netlify)
  - A coluna *done* representa que uma tarefa foi concluída com sucesso e está em produção sem aparentes problemas
- Durante o processo de desenvolvimento, criei a branch `develop` e a branch `main` e, para cada tarefa, criei branches relacionadas com os prefixos `feature/nomeDaBranch` e `bugfix/nomeDaBrach`, que foram mergeados em `develop` para terem o PR revisado e mergeado com `main`
- Optei por utilizar o Webpack, pois sua capacidade de criar um *bundle* do código, tem a vantagem de otimizar o desempenho da página e permitir que, caso esse projeto seja revisitado futuramente, seja mais fácil de escalar com o uso do gerencimento de dependências e lazy loading, entre outros, que são proporcionados pelo Webpack

## Considerações
Gostei bastante de ter desenvolvido este projeto do zero e acredito ter sido uma ótima oportunidade de me desafiar a codificar sem o uso de libs e frameworks. Minha estratégia foi tentar simplificar ao máximo a construção dos elementos para que eu pudesse ir construindo aos poucos as camadas de interatividade da página. Daqui a algum tempo eu planejo retornar neste projeto para refatorar alguns códigos que acredito que podem melhorar, pois com certeza terei aprendido mais e terei uma nova perspectiva.
