# Sorting Visualizer

Visualizador interativo de algoritmos de ordenacao em JavaScript puro, usando ES Modules. Sem frameworks e sem dependencias.

## Algoritmos implementados

| Algoritmo       | Melhor     | Medio      | Pior       | Estavel |
|-----------------|------------|------------|------------|---------|
| Bubble Sort     | O(n)       | O(n^2)     | O(n^2)     | Sim     |
| Selection Sort  | O(n^2)     | O(n^2)     | O(n^2)     | Nao     |
| Insertion Sort  | O(n)       | O(n^2)     | O(n^2)     | Sim     |
| Quick Sort      | O(n log n) | O(n log n) | O(n^2)     | Nao     |
| Merge Sort      | O(n log n) | O(n log n) | O(n log n) | Sim     |

## Conceitos aplicados

- Recursao em Quick Sort e Merge Sort
- Programacao assincrona com async/await para animar sem travar a interface
- ES Modules com separacao por responsabilidade
- Reutilizacao de elementos do DOM ao inves de recriar a cada frame
- Estado centralizado em modulo proprio para evitar dependencia circular
- Analise de complexidade de algoritmos

## Estrutura

    js/
      main.js
      render.js
      estado.js
      algoritmos/
        bubble.js
        selection.js
        insertion.js
        quick.js
        merge.js

## Como rodar

O projeto usa ES Modules, entao precisa ser servido via HTTP.

    python -m http.server 5500

Depois abra http://localhost:5500

## Decisoes de arquitetura

- Os algoritmos nao acessam o DOM diretamente, recebem o array e o container
- O estado de cancelamento permite gerar um novo array durante uma ordenacao
- A renderizacao reutiliza os elementos do DOM para manter a animacao fluida

## Licenca

MIT