declare const confetti: (opcoes?: object) => void;

const sim = document.getElementById("sim")!;
const nao = document.getElementById("nao")!;

function fugir(x: number, y: number) {
  let left, top, tentativas = 0;
  do {
    left = Math.random() * (innerWidth - nao.offsetWidth);
    top = Math.random() * (innerHeight - nao.offsetHeight);
  } while (Math.hypot(left - x, top - y) < 150 && ++tentativas < 50);

  nao.style.position = "fixed";
  nao.style.left = left + "px";
  nao.style.top = top + "px";
}

document.addEventListener("mousemove", (e) => {
  const r = nao.getBoundingClientRect();
  const distancia = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  if (distancia < 100) fugir(e.clientX, e.clientY);
});

nao.addEventListener("touchstart", (e) => {
  e.preventDefault();
  fugir(e.touches[0].clientX, e.touches[0].clientY);
});

nao.addEventListener("click", (e) => fugir(e.clientX, e.clientY));

sim.addEventListener("click", () => {
  document.getElementById("pergunta")!.hidden = true;
  document.getElementById("resposta")!.hidden = false;
  confetti({ particleCount: 200, spread: 90 });
});
