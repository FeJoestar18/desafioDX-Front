# InsightHub

Painel administrativo moderno para gestão de times, integrantes e cargos.

Projetado com **React**, **TypeScript** e **Tailwind CSS**, o projeto entrega uma experiência de usuário fluida, responsiva e com um visual moderno inspirado em dashboards SaaS.

---

## Visão Geral

O InsightHub permite gerenciar todo o ciclo de times e colaboradores:

- Cadastro e listagem de **times**
- Cadastro de **integrantes** com associação de cargos
- CRUD completo de **cargos**
- Relatórios e busca de times por período
- Dashboard de visão geral para acompanhamento rápido

---

## Funcionalidades principais

- **Dashboard geral** com cards de times, integrantes e funções.
- **Gestão de times** com:
  - listagem paginada
  - criação de novos times com multi-select de integrantes disponíveis
  - edição e exclusão com modal de confirmação
- **Gestão de integrantes** com cadastro e associação dinâmica de cargos via `react-select`
- **Gestão de cargos** com criação, edição e exclusão
- **Relatórios de período** que consomem múltiplos endpoints em paralelo (`Promise.allSettled`)
- **Busca de time por data** para avaliar histórico e filtrar resultados

---

## Tecnologias usadas

- **React 18+**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Framer Motion**
- **React Router v6**
- **React Select**
- **React Hot Toast**
- **Lucide React**

---

## Estrutura do projeto

- `src/components/` – componentes reutilizáveis e de interface
- `src/pages/` – telas e páginas da aplicação
- `src/services/` – comunicação com a API
- `src/types/` – tipos TypeScript globais
- `src/assets/` – imagens, ícones e recursos estáticos

---

## Arquitetura e boas práticas

- Client HTTP customizado em `src/services/apiClient.ts`
  - abstração da `Fetch API`
  - geração de query strings com `URLSearchParams`
  - métodos HTTP padronizados (`get`, `post`, `put`, `delete`)
  - suporte a intervalo de datas para relatórios
- Separação clara entre apresentação e lógica de dados
- Layout responsivo e componentes visuais reutilizáveis
- Feedback visual consistente com toasts e modais

---

## Como rodar localmente

### Pré-requisitos

- Node.js v18+
- NPM, Yarn ou pnpm
- Backend rodando localmente em `http://localhost:8080`

### Instalação

```bash
git clone <url-do-repositorio>
cd front-projet
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com a URL da API:

```env
VITE_API_URL=http://localhost:8080
```

> Se o arquivo não existir, o projeto usará `http://localhost:8080` como padrão.

### Executando

```bash
npm run dev
```

Acesse a aplicação em `http://localhost:5173` ou na porta informada no terminal.

---

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera o build de produção
- `npm run preview` — serve o build localmente

---

## Observações

- O projeto foi pensado para ser leve e rápido, evitando dependências pesadas como Axios.
- O visual foca em um estilo moderno, com interface limpa e experiência de navegação agradável.
- As telas são preparadas para casos de dados vazios com estados amigáveis ao usuário.
