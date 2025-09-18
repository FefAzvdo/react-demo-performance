[Read this in English / Leia isto em Inglês](README.md)

# Demonstração de Performance em React com `useMemo`

Este projeto é uma aplicação React simples, criada para demonstrar de forma prática e visual o impacto do hook `useMemo` na otimização de performance. A aplicação renderiza um componente que realiza um cálculo computacionalmente "pesado" e permite que o usuário ative ou desative o `useMemo` para comparar a diferença na responsividade da interface.

## O que o código faz?

A aplicação consiste em dois componentes principais: `App` e `HeavyComponent`.

1.  **`App.js` (Componente Principal):**

    - Gerencia o estado geral da aplicação, incluindo uma lista de números, um contador de cliques e um booleano para ativar/desativar o modo `useMemo`.
    - Renderiza a interface principal, que inclui:
      - Um botão **"Click fast!"**: Incrementa um contador de cliques. Este botão é usado para testar a responsividade da UI. Se a aplicação estiver lenta, o contador não atualizará suavemente.
      - Um botão **"Add number"**: Adiciona um novo número à lista.
      - Um checkbox **"Enable useMemo"**: Controla qual versão do cálculo (otimizada ou não) será executada no `HeavyComponent`.
      - Uma lista que exibe os números atuais.
    - Renderiza o `HeavyComponent`, passando a lista de números e o modo `useMemo` como `props`.

2.  **`HeavyComponent.js` (Componente de Cálculo Pesado):**
    - Este componente recebe a lista de números (`numbers`) e o modo `useMemo` (`useMemoMode`).
    - Sua principal função é calcular a soma de todos os números recebidos. No entanto, para simular uma operação realmente custosa, a função `computeSum` primeiro executa um `for` loop gigante (200 milhões de iterações) antes de somar os números.
    - **A lógica central está aqui**:
      - Se `useMemoMode` for `false`, a função `computeSum()` é chamada diretamente em **toda renderização** do `HeavyComponent`.
      - Se `useMemoMode` for `true`, o resultado de `computeSum()` é "memoizado" usando o hook `useMemo`. Isso significa que o cálculo pesado só será re-executado se a sua dependência — a lista `numbers` — for alterada.

## Como testar a diferença de performance

1.  **Execute a aplicação.**
2.  **Mantenha o checkbox "Enable useMemo" desmarcado.**
3.  Clique rapidamente no botão **"Click fast! Counter: ..."**. Você notará que a interface está lenta e travando. O contador de cliques demora para atualizar.
    - **Por que isso acontece?** Cada vez que você clica no botão, o estado `clicks` do componente `App` é atualizado, o que causa uma nova renderização. Como `HeavyComponent` é um filho de `App`, ele também é renderizado novamente. Sem `useMemo`, a função `computeSum` (com seu loop de 200 milhões de iterações) é executada a cada clique, bloqueando a thread principal do JavaScript e congelando a UI.
4.  **Agora, marque o checkbox "Enable useMemo".**
5.  Clique rapidamente no botão **"Click fast!"** novamente. Você verá que a interface está extremamente responsiva e o contador atualiza instantaneamente.
    - **Por que isso acontece?** Com `useMemo` ativado, o resultado da soma é armazenado em cache. Quando você clica no botão, o componente `App` e o `HeavyComponent` ainda são renderizados novamente. No entanto, o React vê que a dependência do `useMemo` (a prop `numbers`) não mudou. Portanto, em vez de re-executar a função `computeSum`, ele retorna o valor que já havia sido calculado e armazenado, evitando o cálculo pesado e mantendo a UI fluida.
6.  Clique no botão **"Add number"**. Você notará um pequeno atraso. Isso ocorre porque a lista `numbers` foi alterada, forçando o `useMemo` a re-executar o cálculo pesado, o que é o comportamento esperado.

## Conclusão

Este exemplo ilustra perfeitamente o propósito do `useMemo`: ele é uma ferramenta de otimização para evitar cálculos caros em renderizações subsequentes quando as dependências do cálculo não mudaram. Ao "memoizar" (lembrar) o resultado, ele impede que operações pesadas afetem a responsividade da interface do usuário durante renderizações desnecessárias.
