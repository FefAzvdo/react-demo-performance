[Read this in English / Leia isto em Inglês](README.md)

# React Performance Playground

Este projeto é uma aplicação web interativa, construída para demonstrar técnicas essenciais de otimização de performance em React de uma forma prática e visual. Em vez de depender de `console.log`, este playground usa animações e simulações realistas para mostrar o impacto da otimização na responsividade da UI e nos tempos de carregamento.

### [➡️ Link para a Demonstração Online ⬅️](https://react-demo-performance.vercel.app/)

---

## Demonstrações Incluídas

A aplicação é dividida em três demonstrações distintas, cada uma focando em um gargalo de performance comum.

### 1. `useMemo`

Esta demo simula um componente com um cálculo caro e bloqueante. Você pode ativar e desativar o `useMemo` para ver seu impacto direto na responsividade da interface.

- **Sem `useMemo`**: Clicar no botão "Re-render" faz com que toda a UI congele até que o cálculo pesado seja concluído.
- **Com `useMemo`**: A UI permanece rápida e responsiva porque o cálculo caro é pulado, e o resultado em cache é usado em seu lugar.

### 2. `React.memo` + `useCallback`

Esta demo ilustra por que passar funções como props pode quebrar otimizações e como o `useCallback` resolve isso. Um componente filho é envolto em `React.memo` para prevenir re-renderizações desnecessárias.

- **Sem `useCallback`**: Uma nova função é criada a cada renderização do pai. O `React.memo` vê uma nova prop e é forçado a re-renderizar o componente filho, que é destacado com um flash vermelho.
- **Com `useCallback`**: A exata mesma instância da função é passada como prop. O `React.memo` identifica corretamente que as props não mudaram e pula a re-renderização.

### 3. `React.lazy` + `Suspense`

Esta demo mostra como melhorar o tempo de carregamento inicial da página através de _code-splitting_, carregando componentes grandes apenas quando são necessários.

- **Como funciona**: A demo apresenta um "Componente Super Pesado" (que inclui a biblioteca `lodash` para aumentar seu tamanho de arquivo). Este componente não é incluído no pacote JavaScript inicial. Ao clicar no botão "Carregar", você pode observar o novo "chunk" de JavaScript sendo baixado na aba "Network" do seu navegador. Instruções são fornecidas para simular uma rede lenta e tornar o efeito mais evidente.

---

## Tecnologias Utilizadas

- **Framework**: React 18
- **Build Tool**: Vite
- **Estilização**: TailwindCSS
- **Simulação**: A biblioteca `lodash` é usada para simular uma dependência grande na demo de lazy loading.

## Como Executar Localmente

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver ocupada ).
