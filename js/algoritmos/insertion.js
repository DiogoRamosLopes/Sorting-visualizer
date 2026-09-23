import { renderizar } from "../render.js";
import { estado, sleep } from "../estado.js";

export async function insertionSort(array, container) {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const chave = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > chave) {
      if (estado.cancelado) return;

      array[j + 1] = array[j];
      renderizar(container, array, { comparing: [j, j + 1] });
      await sleep(estado.velocidade);
      j--;
    }

    array[j + 1] = chave;
    renderizar(container, array, { swapping: [j + 1] });
    await sleep(estado.velocidade);
  }

  renderizar(container, array, {
    sorted: array.map((_, i) => i),
  });
}