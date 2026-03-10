# Plano de Ensino: AngularJS 1.x — CRUD de Tarefas

## Visão Geral

Um app de **lista de tarefas** com autenticação simulada, múltiplas páginas, gerenciamento de estado e boas práticas. Ao final, você terá passado por tudo que encontraria num projeto real.

---

## Módulo 1 — Fundamentos & Setup
> **Objetivo:** Entender o básico do AngularJS e subir o projeto.

**O que você vai fazer:**
- Criar `index.html` com AngularJS via CDN
- Criar o módulo principal (`ng-app`)
- Criar um controller básico com `$scope`
- Two-way data binding: input + exibição em tempo real
- Diretivas essenciais: `ng-model`, `ng-click`, `ng-repeat`, `ng-show`, `ng-hide`, `ng-if`, `ng-class`

**Conceitos:** Modules, Controllers, `$scope`, Expressions, Directives

---

## Módulo 2 — CRUD Completo (em uma única página)
> **Objetivo:** Criar, listar, editar e deletar tarefas.

**O que você vai fazer:**
- Listar tarefas com `ng-repeat`
- Adicionar tarefa (formulário + validação com `ng-messages`)
- Editar tarefa inline
- Remover tarefa com confirmação
- Marcar como concluída (`ng-class` condicional)
- Filtros: busca por texto, filtrar por status (todas/pendentes/concluídas)
- Ordenação com `orderBy`

**Conceitos:** Forms, Validação, Filters, `ng-class`, `track by`

---

## Módulo 3 — Services & Gerenciamento de Estado
> **Objetivo:** Separar lógica de negócio dos controllers.

**O que você vai fazer:**
- Criar um `TaskService` (factory) que centraliza o estado das tarefas
- Mover toda lógica de CRUD para o service
- Persistir dados no `localStorage`
- Criar um `NotificationService` para exibir mensagens de sucesso/erro

**Conceitos:** Factory vs Service vs Provider, Dependency Injection, Singleton pattern, separação de responsabilidades

---

## Módulo 4 — Componentização
> **Objetivo:** Transformar trechos de UI em componentes reutilizáveis.

**O que você vai fazer:**
- Criar component `<task-list>` (lista de tarefas)
- Criar component `<task-item>` (item individual)
- Criar component `<task-form>` (formulário de criação/edição)
- Criar component `<app-header>` e `<app-footer>`
- Comunicação entre componentes via **bindings** (`<`, `&`, `@`)

**Conceitos:** `.component()` vs `.directive()`, bindings, lifecycle hooks (`$onInit`, `$onChanges`, `$onDestroy`), one-way data flow

---

## Módulo 5 — Rotas & Navegação
> **Objetivo:** Criar múltiplas páginas com `ngRoute` ou `ui-router`.

**O que você vai fazer:**
- Instalar `ngRoute`
- Criar rotas: `/login`, `/tasks`, `/tasks/:id` (detalhe)
- Criar uma página de "Sobre" (`/about`)
- Implementar `ng-view`
- Navegação com links e navegação programática (`$location`)

**Conceitos:** `$routeProvider`, `templateUrl`, `controller`, `resolve`, parâmetros de rota

---

## Módulo 6 — Proteção de Rotas (Auth Simulada)
> **Objetivo:** Simular autenticação e proteger páginas.

**O que você vai fazer:**
- Criar `AuthService` com login/logout simulado (sem backend)
- Criar tela de login com formulário
- Proteger rota `/tasks` — redirecionar para `/login` se não "logado"
- Usar evento `$routeChangeStart` para interceptar navegação
- Exibir/esconder itens do menu conforme estado de auth
- Botão de logout

**Conceitos:** Route guards, `$rootScope` events, `resolve` com promises, estado de autenticação

---

## Módulo 7 — HTTP & Comunicação com API (simulada)
> **Objetivo:** Aprender a consumir APIs REST.

**O que você vai fazer:**
- Criar um mock de API com `$httpBackend` ou usar JSONPlaceholder
- Refatorar `TaskService` para usar `$http`
- Tratar loading states (spinner enquanto carrega)
- Tratar erros de requisição
- Interceptors HTTP (ex: adicionar token no header)

**Conceitos:** `$http`, Promises, Interceptors, loading/error states

---

## Módulo 8 — Diretivas Customizadas
> **Objetivo:** Criar diretivas para funcionalidades reutilizáveis.

**O que você vai fazer:**
- Diretiva `confirm-click` (pedir confirmação antes de deletar)
- Diretiva `auto-focus` (foco automático no input)
- Diretiva `tooltip` customizado
- Entender `link`, `compile`, `scope`, `restrict`, `template`

**Conceitos:** Directive Definition Object, isolate scope, transclusion, `require`

---

## Módulo 9 — Estilização
> **Objetivo:** Deixar o app bonito e responsivo.

**O que você vai fazer:**
- Estruturar CSS por componente
- Animações com `ngAnimate` (ao adicionar/remover tarefas)
- Responsividade básica
- Estados visuais (hover, active, disabled)
- Tema claro/escuro com `ng-class` global

**Conceitos:** `ngAnimate`, CSS architecture, `ng-class`, `ng-style`

---

## Módulo 10 — Boas Práticas & Padrões de Projeto Real
> **Objetivo:** Refatorar o projeto inteiro seguindo o John Papa Style Guide.

**O que você vai fazer:**
- Controller As syntax (eliminar `$scope`)
- IIFE em todos os arquivos
- Estrutura de pastas por feature
- Usar `$onInit` em vez de lógica no construtor
- Named functions em vez de funções anônimas
- Constantes em arquivo separado
- Minification-safe DI (`$inject` ou array notation)

**Conceitos:** Style Guide, folder structure, naming conventions, DI seguro

---

## Estrutura Final de Pastas

```
angularjs/
├── index.html
├── app/
│   ├── app.module.js
│   ├── app.routes.js
│   ├── app.constants.js
│   ├── core/
│   │   ├── auth.service.js
│   │   ├── notification.service.js
│   │   └── http-interceptor.js
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   └── confirm-dialog/
│   ├── tasks/
│   │   ├── task-list/
│   │   ├── task-item/
│   │   ├── task-form/
│   │   ├── task-detail/
│   │   └── task.service.js
│   ├── login/
│   │   ├── login.component.js
│   │   └── login.html
│   ├── about/
│   │   └── about.component.js
│   └── directives/
│       ├── confirm-click.directive.js
│       └── auto-focus.directive.js
├── assets/
│   └── css/
│       ├── main.css
│       └── animations.css
└── README.md
```
