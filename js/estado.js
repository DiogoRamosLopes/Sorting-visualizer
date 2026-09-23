export const estado = {
  cancelado: false,
  velocidade: 25,
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));