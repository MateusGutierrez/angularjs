# Tarefas & Desafios — AngularJS

Tarefas que simulam o dia a dia de um desenvolvedor AngularJS, do nível júnior ao sênior.
Marque com `[x]` conforme for completando.

---

## Nível 1 — Júnior (Fundamentos)

### Bugs para corrigir

- [ ] **Bug: Contador de stats não atualiza em tempo real**
  O contador de tarefas (total/feitas/pendentes) só atualiza ao adicionar/remover.
  Se você marcar uma tarefa como "concluir", o contador não muda até a próxima ação.
  _Dica: o `stats` é recalculado só em `addTask` e `removeTask`._

- [ ] **Bug: Formulário aceita tarefas com espaços em branco**
  Digite `"   "` (só espaços) com 3+ caracteres — o formulário aceita.
  Corrija a validação para rejeitar strings que sejam só whitespace.

- [ ] **Bug: Edição não tem cancelamento**
  Ao clicar em "Editar", se o usuário mudar o texto e quiser cancelar, não tem como desfazer.
  Adicione um botão "Cancelar" que restaura o valor original.

### Features para implementar

- [ ] **Feature: Persistir tarefas no localStorage**
  As tarefas somem quando a página recarrega.
  Use `localStorage` para salvar e recuperar as tarefas.
  _Dica: use `JSON.stringify()` e `JSON.parse()`. Atualize o `TaskService`._

- [ ] **Feature: Adicionar data de criação às tarefas**
  Cada tarefa deve mostrar quando foi criada.
  _Dica: use o filtro `date` do Angular: `{{ task.createdAt | date:'dd/MM/yyyy HH:mm' }}`._

- [ ] **Feature: Ordenação customizada**
  Adicione botões para ordenar por: nome (A-Z), nome (Z-A), data de criação, status.
  _Dica: `orderBy` aceita `-name` para ordem reversa._

- [ ] **Feature: Limpar todas as tarefas concluídas**
  Adicione um botão "Limpar concluídas" que remove todas as tarefas com `done: true` de uma vez.

---

## Nível 2 — Júnior/Pleno (Componentização & API)

### Bugs para corrigir

- [ ] **Bug: Busca de personagens dispara a cada tecla**
  Ao digitar no campo de busca de personagens, cada letra faz uma requisição à API.
  Implemente um **debounce** para esperar o usuário parar de digitar (300ms).
  _Dica: use `$timeout` para criar um debounce manual._

- [ ] **Bug: Paginação quebra ao filtrar**
  Se você está na página 5, aplica um filtro, e a API retorna só 2 páginas, a paginação mostra "Página 5 de 2".
  _Corrija: ao buscar, sempre volte para a página 1._

### Features para implementar

- [ ] **Feature: Favoritar personagens**
  Adicione um botão de favorito (estrela) em cada card de personagem.
  Os favoritos devem ser salvos no localStorage e acessíveis numa rota `/favorites`.
  _Isso envolve: novo service, novo component, nova rota, localStorage._

- [ ] **Feature: Componente de paginação reutilizável**
  Extraia a paginação para um component separado que recebe `currentPage`, `totalPages` e emite evento de mudança.
  _Dica: use `bindings` com `<` (one-way) e `&` (callback)._

  ```js
  bindings: {
      currentPage: '<',
      totalPages: '<',
      onPageChange: '&'
  }
  ```

- [ ] **Feature: Skeleton loading**
  Em vez de um spinner, mostre "esqueletos" (placeholders cinza) no formato dos cards enquanto carrega.
  _Dica: crie cards cinza com `ng-repeat` de um array fixo de 8 itens._

- [ ] **Feature: Contador de personagens por status**
  Na página de personagens, mostre um resumo: "X vivos, Y mortos, Z desconhecidos" baseado nos resultados atuais.

---

## Nível 3 — Pleno (State Management & Patterns)

### Bugs para corrigir

- [ ] **Bug: Estado de filtros perde ao voltar da página de detalhe**
  Vá para Characters, filtre por "Dead", clique num personagem, volte.
  Os filtros voltam ao padrão. Use o `Store` para manter o estado dos filtros.

- [ ] **Bug: Race condition no carregamento**
  Se o usuário clicar rápido entre páginas, a resposta da primeira requisição pode chegar depois da segunda, mostrando dados errados.
  _Dica: cancele a requisição anterior ou ignore respostas obsoletas._

### Features para implementar

- [ ] **Feature: Histórico de ações (Undo/Redo)**
  Implemente undo/redo para ações de tarefas (adicionar, remover, toggle).
  _Dica: mantenha um array de snapshots do estado no Store._

- [ ] **Feature: Cache de requisições da API**
  Se o usuário já carregou a página 1, não busque de novo.
  Implemente um cache simples no `RickAndMortyService`.
  _Dica: use um objeto como mapa `{ 'page=1&name=rick': responseData }`._

- [ ] **Feature: Breadcrumbs dinâmico**
  Crie um componente de breadcrumb que lê a rota atual e mostra: `Home > Characters > Rick Sanchez`.
  _Dica: use `$route.current` e `$routeParams`._

- [ ] **Feature: Notificações/Toasts**
  Crie um sistema de notificações: ao adicionar/remover tarefa ou favoritar personagem, mostre um toast temporário.
  _Isso envolve: novo service (`NotificationService`), nova diretiva, CSS para animação._

---

## Nível 4 — Pleno/Sênior (Arquitetura & Performance)

### Bugs para corrigir

- [ ] **Bug: Memory leak nos listeners**
  Verifique se todos os `$on`, `$watch` e `Store.subscribe` estão sendo limpos no `$onDestroy`.
  Abra o DevTools > Memory e confirme que não há leak ao navegar entre rotas.

- [ ] **Bug: Watchers excessivos na lista de personagens**
  Cada card tem múltiplos bindings. Com 20 cards x N bindings, o digest cycle fica lento.
  Use `::` (one-time binding) onde o dado não muda: `{{ ::char.name }}`.

### Features para implementar

- [ ] **Feature: Resolver de rota**
  Use `resolve` no `$routeProvider` para carregar dados ANTES de renderizar a view.
  A página de detalhe do personagem deve carregar os dados no resolve, não no controller.
  ```js
  .when('/characters/:id', {
      template: '<character-detail></character-detail>',
      resolve: {
          character: function(RickAndMortyService, $route) {
              return RickAndMortyService.getCharacterById($route.current.params.id);
          }
      }
  })
  ```

- [ ] **Feature: Infinite scroll**
  Na página de personagens, em vez de paginação manual, implemente scroll infinito.
  _Dica: crie uma diretiva que detecta quando o usuário chega ao fim da página._

- [ ] **Feature: Decorators**
  Use `$provide.decorator` para adicionar logging automático a todos os métodos do `TaskService` sem modificar o service original.
  _Isso é o padrão Decorator — muito útil para debugging em produção._

- [ ] **Feature: Testes unitários**
  Configure Karma + Jasmine e escreva testes para:
  - `TaskService` (add, remove, toggle, getStats)
  - `RickAndMortyService` (mock do `$http`)
  - Filtro `translateStatus`
  _Dica: `npm install karma karma-jasmine jasmine-core karma-chrome-launcher --save-dev`_

---

## Nível 5 — Sênior (Tópicos Avançados)

- [ ] **Feature: Módulos lazy-loaded**
  Separe o app em módulos (`taskModule`, `characterModule`) e carregue sob demanda.
  _Pesquise: `ocLazyLoad` para AngularJS._

- [ ] **Feature: Web Workers**
  Mova a filtragem/ordenação pesada de tarefas para um Web Worker.
  _Quando a lista tem 1000+ itens, o digest cycle trava a UI._

- [ ] **Feature: Migration path para Angular 2+**
  Configure `ngUpgrade` para rodar AngularJS e Angular lado a lado.
  Migre o componente `characterDetail` para Angular (TypeScript).
  _Esse é o cenário real que sêniors enfrentam em projetos legados._

- [ ] **Feature: CI/CD pipeline**
  Configure um pipeline (GitHub Actions) que roda os testes, faz lint e deploy automático.

- [ ] **Feature: Documentação técnica**
  Documente a arquitetura do projeto: decisões tomadas, padrões utilizados, fluxo de dados.
  Isso é rotina de sênior — código sem documentação é código temporário.

---

## Dicas gerais para o dia a dia

1. **Sempre limpe listeners no `$onDestroy`** — memory leak é o bug mais comum em AngularJS
2. **Use `track by` no `ng-repeat`** — sem isso, o Angular recria todos os elementos do DOM
3. **Prefira `component` a `directive`** — components são mais simples e seguem o padrão do Angular 2+
4. **Nunca manipule DOM no controller** — use diretivas para isso
5. **Services são singletons** — uma instância compartilhada no app inteiro
6. **`$scope.$apply()` só é necessário fora do ciclo Angular** (setTimeout, eventos DOM nativos)
7. **Use one-time binding `::` para dados estáticos** — reduz watchers e melhora performance
8. **Sempre trate erros de `$http`** — `.catch()` não é opcional em produção
