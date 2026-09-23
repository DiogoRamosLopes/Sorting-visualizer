import { renderizar } from "../render.js";
import { estado, sleep } from "../estado.js";

export async function bubbleSort(array, container) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (estado.cancelado) return;

      renderizar(container, array, { comparing: [j, j + 1] });
      await sleep(estado.velocidade);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderizar(container, array, { swapping: [j, j + 1] });
        await sleep(estado.velocidade);
      }
    }
  }

  renderizar(container, array, {
    sorted: array.map((_, i) => i),
  });
}