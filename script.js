import { database, ref, set, get, push } from "./firebase-config.js";

// Acervo de versículos (adicione quantos quiser)
const acervoBiblico = [
  {
    textoOriginal: [
      "Vós sois o sal da terra;",
      "mas se o sal for insípido, com que se há de salgar?",
      "Para nada mais presta, senão para se lançar fora,",
      "e ser pisado pelos homens."
    ],
    referencia: "Mateus 5:13"
  },
  // Adicione outros versículos conforme necessário...
];

// Função para embaralhar o array (usada para embaralhar as frases)
function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Variáveis globais para armazenar estado do jogo
let textoOriginalGlobal = [];
let referenciaGlobal = "";
let salaIDGlobal = "";
let nomeJogadorGlobal = "";
let tempoInicial;
let intervaloTempo;

// Função para iniciar o cronômetro
function iniciarCronometro() {
  tempoInicial = Date.now();
  intervaloTempo = setInterval(() => {
    const tempoAtual = Math.floor((Date.now() - tempoInicial) / 1000);
    document.getElementById("result").innerText = `⏱️ Tempo: ${tempoAtual} segundos`;
  }, 1000);
}

// Função para parar o cronômetro e retornar o tempo em segundos
function pararCronometro() {
  clearInterval(intervaloTempo);
  return Math.floor((Date.now() - tempoInicial) / 1000);
}

// Função para exibir o texto embaralhado na tela e iniciar o drag & drop
function exibirTextoEmbaralhado(texto, referencia) {
  const container = document.getElementById("story-list");
  container.innerHTML = "";

  texto.forEach((linha) => {
    const li = document.createElement("li");
    li.textContent = linha;
    li.setAttribute("draggable", "true");
    li.classList.add("draggable-item");
    container.appendChild(li);
  });

  // Exibe a referência (opcional)
  document.getElementById("result").textContent = `Referência: ${referencia}`;

  // Ativa o drag & drop e inicia o cronômetro
  ativarDragAndDrop();
  iniciarCronometro();
}

// Função para ativar drag & drop (mouse e touch)
function ativarDragAndDrop() {
  const listItems = document.querySelectorAll("#story-list li");
  let draggedItem = null;

  listItems.forEach((item) => {
    // Eventos para mouse
    item.addEventListener("dragstart", function (e) {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = "none";
      }, 0);
    });
    item.addEventListener("dragend", function (e) {
      setTimeout(() => {
        draggedItem.style.display = "block";
        draggedItem = null;
      }, 0);
    });
    item.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    item.addEventListener("drop", function (e) {
      e.preventDefault();
      if (draggedItem !== this) {
        const allItems = [...document.querySelectorAll("#story-list li")];
        const draggedIndex = allItems.indexOf(draggedItem);
        const droppedIndex = allItems.indexOf(this);
        if (draggedIndex < droppedIndex) {
          this.parentNode.insertBefore(draggedItem, this.nextSibling);
        } else {
          this.parentNode.insertBefore(draggedItem, this);
        }
      }
    });

    // Eventos para touch (mobile)
    let touchStartY = 0;
    item.addEventListener("touchstart", function (e) {
      touchStartY = e.touches[0].clientY;
      draggedItem = item;
      item.classList.add("drag-over");
    });
    item.addEventListener("touchmove", function (e) {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const movingUp = touchY < touchStartY;
      const currentItem = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (currentItem && currentItem.tagName === "LI" && currentItem !== draggedItem) {
        const parent = currentItem.parentNode;
        if (movingUp) {
          parent.insertBefore(draggedItem, currentItem);
        } else {
          parent.insertBefore(draggedItem, currentItem.nextSibling);
        }
      }
      touchStartY = touchY;
    });
    item.addEventListener("touchend", function (e) {
      item.classList.remove("drag-over");
      draggedItem = null;
    });
  });
}

// Evento do botão "Verificar Ordem"
document.getElementById("checkOrder").addEventListener("click", () => {
  const tempoFinal = pararCronometro();
  const userOrder = Array.from(document.getElementById("story-list").children).map(li => li.textContent.trim());
  const isCorrect = JSON.stringify(userOrder) === JSON.stringify(textoOriginalGlobal);

  if (isCorrect) {
    alert(`Parabéns, ${nomeJogadorGlobal}! Você acertou em ${tempoFinal} segundos.`);
  } else {
    alert("Ops! A ordem está incorreta. Tente novamente.");
  }

  // Grava o resultado no ranking do Firebase
  const rankingRef = ref(database, `salas/${salaIDGlobal}/ranking`);
  push(rankingRef, {
    jogador: nomeJogadorGlobal,
    tempo: tempoFinal,
    resultado: isCorrect ? "Acertou" : "Errou",
    timestamp: new Date().toISOString()
  });
});

// Função para entrar na sala
function entrarNaSala() {
  salaIDGlobal = document.getElementById("salaID").value.trim();
  nomeJogadorGlobal = document.getElementById("nomeJogador").value.trim();

  if (!salaIDGlobal || !nomeJogadorGlobal) {
    alert("Por favor, preencha o ID da sala e seu nome.");
    return;
  }

  document.getElementById("sala-info").textContent = `Sala: ${salaIDGlobal} | Jogador: ${nomeJogadorGlobal}`;

  const salaRef = ref(database, `salas/${salaIDGlobal}`);

  get(salaRef).then((snapshot) => {
    if (snapshot.exists()) {
      // Se a sala já existir, carrega o texto salvo
      const data = snapshot.val();
      textoOriginalGlobal = data.textoOriginal;
      referenciaGlobal = data.referencia;
      exibirTextoEmbaralhado(data.textoEmbaralhado, referenciaGlobal);
    } else {
      // Se a sala não existir, seleciona um versículo aleatório e cria a sala
      const indiceAleatorio = Math.floor(Math.random() * acervoBiblico.length);
      const versiculoSelecionado = acervoBiblico[indiceAleatorio];
      textoOriginalGlobal = versiculoSelecionado.textoOriginal;
      referenciaGlobal = versiculoSelecionado.referencia;
      const textoEmbaralhado = embaralhar(textoOriginalGlobal);

      set(salaRef, {
        textoOriginal: textoOriginalGlobal,
        textoEmbaralhado: textoEmbaralhado,
        referencia: referenciaGlobal
      }).then(() => {
        exibirTextoEmbaralhado(textoEmbaralhado, referenciaGlobal);
      }).catch((error) => {
        console.error("Erro ao criar a sala:", error);
      });
    }
  }).catch((error) => {
    console.error("Erro ao buscar a sala:", error);
  });
}

// Evento do botão "Entrar" na sala
document.getElementById("entrarSalaBtn").addEventListener("click", entrarNaSala);
