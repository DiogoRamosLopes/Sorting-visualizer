import { renderizar } from "../render.js";
import { estado, sleep } from "../estado.js";

export async function quickSort(array, container) {
  await _quick(array, 0, array.length - 1, container);

  if (estado.cancelado) return;

  renderizar(container, array, {
    sorted: array.map((_, i) => i),
  });
}

async function _quick(array, inicio, fim, container) {
  if (inicio >= fim) return;
  if (estado.cancelado) return;

  const pivo = await particionar(array, inicio, fim, container);
  await _quick(array, inicio, pivo - 1, container);
  await _quick(array, pivo + 1, fim, container);
}

async function particionar(array, inicio, fim, container) {
  const pivo = array[fim];
  let i = inicio - 1;

  for (let j = inicio; j < fim; j++) {
    if (estado.cancelado) return i;

    renderizar(container, array, { comparing: [j, fim] });
    await sleep(estado.velocidade);

    if (array[j] < pivo) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      renderizar(container, array, { swapping: [i, j] });
      await sleep(estado.velocidade);
    }
  }

  [array[i + 1], array[fim]] = [array[fim], array[i + 1]];
  renderizar(container, array, { swapping: [i + 1, fim] });
  await sleep(estado.velocidade);

  return i + 1;
}