import { renderizar } from "../render.js";
import { estado, sleep } from "../estado.js";

export async function selectionSort(array, container) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let min = i;

    for (let j = i + 1; j < n; j++) {
      if (estado.cancelado) return;

      renderizar(container, array, { comparing: [min, j] });
      await sleep(estado.velocidade);

      if (array[j] < array[min]) min = j;
    }

    if (min !== i) {
      [array[i], array[min]] = [array[min], array[i]];
      renderizar(container, array, { swapping: [i, min] });
      await sleep(estado.velocidade);
    }
  }

  renderizar(container, array, {
    sorted: array.map((_, i) => i),
  });
}