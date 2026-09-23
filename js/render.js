const barras = [];

export function renderizar(container, array, destaque = {}) {
  const max = Math.max(...array);

  if (barras.length !== array.length) {
    container.innerHTML = "";
    barras.length = 0;
    array.forEach(() => {
      const barra = document.createElement("div");
      barra.classList.add("bar");
      container.appendChild(barra);
      barras.push(barra);
    });
  }

  const comparing = new Set(destaque.comparing || []);
  const swapping = new Set(destaque.swapping || []);
  const sorted = new Set(destaque.sorted || []);

  array.forEach((valor, i) => {
    const barra = barras[i];
    barra.style.height = `${(valor / max) * 100}%`;
    barra.classList.toggle("comparing", comparing.has(i));
    barra.classList.toggle("swapping", swapping.has(i));
    barra.classList.toggle("sorted", sorted.has(i));
  });
}