import { renderizar } from "../render.js";
import { estado, sleep } from "../estado.js";

export async function mergeSort(array, container) {
  await _merge(array, 0, array.length - 1, container);

  if (estado.cancelado) return;

  renderizar(container, array, {
    sorted: array.map((_, i) => i),
  });
}

async function _merge(array, inicio, fim, container) {
  if (inicio >= fim) return;
  if (estado.cancelado) return;

  const meio = Math.floor((inicio + fim) / 2);
  await _merge(array, inicio, meio, container);
  await _merge(array, meio + 1, fim, container);
  await intercalar(array, inicio, meio, fim, container);
}

async function intercalar(array, inicio, meio, fim, container) {
  const esq = array.slice(inicio, meio + 1);
  const dir = array.slice(meio + 1, fim + 1);

  let i = 0;
  let j = 0;
  let k = inicio;

  while (i < esq.length && j < dir.length) {
    if (estado.cancelado) return;

    renderizar(container, array, { comparing: [k] });
    await sleep(estado.velocidade);

    if (esq[i] <= dir[j]) array[k++] = esq[i++];
    else array[k++] = dir[j++];
  }

  while (i < esq.length) array[k++] = esq[i++];
  while (j < dir.length) array[k++] = dir[j++];

  renderizar(container, array);
  await sleep(estado.velocidade);
}