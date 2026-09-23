import { renderizar } from "./render.js";
import { estado } from "./estado.js";
import { bubbleSort } from "./algoritmos/bubble.js";
import { selectionSort } from "./algoritmos/selection.js";
import { insertionSort } from "./algoritmos/insertion.js";
import { quickSort } from "./algoritmos/quick.js";
import { mergeSort } from "./algoritmos/merge.js";

const TAMANHO = 30;

const container = document.getElementById("container");
const statusEl = document.getElementById("status");
const timerEl = document.getElementById("timer");
const btnNovo = document.getElementById("btn-novo");

let rodando = null;

function gerarArray() {
  estado.cancelado = true;
  rodando = null;
  estado.array = Array.from({ length: TAMANHO }, () =>
    Math.floor(Math.random() * 380) + 20
  );
  renderizar(container, estado.array);
  statusEl.textContent = "Novo array gerado. Escolha um algoritmo.";
  timerEl.textContent = "0 ms";
}

function bloquearBotoes(bloquear) {
  document.querySelectorAll(".btn:not(.btn-secondary)").forEach((b) => {
    b.disabled = bloquear;
  });
}

const algoritmos = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  quick: quickSort,
  merge: mergeSort,
};

async function executar(nome) {
  if (rodando) {
    estado.cancelado = true;
    try {
      await rodando;
    } catch (e) {}
  }

  estado.cancelado = false;
  bloquearBotoes(true);
  statusEl.textContent = `Executando ${nome} sort...`;

  const inicio = performance.now();

  rodando = algoritmos[nome](estado.array, container);
  await rodando;
  rodando = null;

  if (estado.cancelado) {
    statusEl.textContent = "Cancelado.";
    bloquearBotoes(false);
    return;
  }

  const tempo = (performance.now() - inicio).toFixed(0);
  timerEl.textContent = `${tempo} ms`;
  statusEl.textContent = `Ordenado em ${tempo}ms`;

  bloquearBotoes(false);
}

btnNovo.addEventListener("click", gerarArray);

Object.keys(algoritmos).forEach((nome) => {
  document
    .getElementById(`btn-${nome}`)
    .addEventListener("click", () => executar(nome));
});

gerarArray();