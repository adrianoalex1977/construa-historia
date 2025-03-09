import { database, ref, set, get, onValue } from "./firebase-config.js";

let salaID = prompt("Digite o ID da sala ou deixe em branco para criar uma nova:");
const jogador = prompt("Digite seu nome:");

// Cria uma nova sala se o ID estiver vazio
if (!salaID) {
    salaID = "sala-" + Math.floor(Math.random() * 100000);
    alert(`Nova sala criada! Código: ${salaID}`);
}

// Referência para o banco de dados
const salaRef = ref(database, `salas/${salaID}`);

// História a ser ordenada
const historia = [
    "Noé construiu uma arca sob ordem de Deus.",
    "Os animais entraram na arca em pares.",
    "Deus enviou um grande dilúvio sobre a terra.",
    "Após 40 dias e 40 noites, a chuva parou.",
    "A arca repousou no monte Ararate e Noé saiu."
];

// Embaralha apenas na criação da sala
get(salaRef).then((snapshot) => {
    if (!snapshot.exists()) {
        set(salaRef, { historia: historia.sort(() => Math.random() - 0.5), jogadores: {} });
    }
});

// Quando a história estiver pronta, exibimos na tela
onValue(salaRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.historia) {
        const storyList = document.getElementById("story-list");
        storyList.innerHTML = "";
        data.historia.forEach((part, index) => {
            let li = document.createElement("li");
            li.textContent = part;
            li.draggable = true;
            li.dataset.index = index;
            li.addEventListener("dragstart", handleDragStart);
            li.addEventListener("dragover", handleDragOver);
            li.addEventListener("drop", handleDrop);
            storyList.appendChild(li);
        });
    }
});

// Variáveis para controle de drag-and-drop
let draggedItem = null;

function handleDragStart(e) {
    draggedItem = e.target;
    setTimeout(() => {
        e.target.style.display = "none";
    }, 0);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const droppedItem = e.target;

    if (draggedItem !== droppedItem && droppedItem.tagName === "LI") {
        const allItems = Array.from(document.getElementById("story-list").children);
        const draggedIndex = allItems.indexOf(draggedItem);
        const droppedIndex = allItems.indexOf(droppedItem);

        // Trocar a ordem dos itens
        if (draggedIndex < droppedIndex) {
            droppedItem.after(draggedItem);
        } else {
            droppedItem.before(draggedItem);
        }
    }

    draggedItem.style.display = "block";
    draggedItem = null;
}

// ⏳ Iniciar tempo
const startTime = Date.now();

// Verificar a resposta
document.getElementById("checkOrder").addEventListener("click", () => {
    let userOrder = Array.from(document.getElementById("story-list").children).map((li) => li.textContent);
    let timeTaken = (Date.now() - startTime) / 1000; // Tempo em segundos

    get(salaRef).then((snapshot) => {
        const data = snapshot.val();
        if (JSON.stringify(userOrder) === JSON.stringify(data.historia)) {  // Verifica com a ordem original
            alert(`Parabéns, ${jogador}! Você acertou em ${timeTaken} segundos.`);
            
            // Salvar resultado do jogador
            set(ref(database, `salas/${salaID}/jogadores/${jogador}`), {
                tempo: timeTaken
            });
        } else {
            alert("Ops! A ordem está errada. Tente novamente.");
        }
    });
});

// Ranking
onValue(salaRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.jogadores) {
        let ranking = Object.entries(data.jogadores).sort((a, b) => a[1].tempo - b[1].tempo);
        let rankText = "🏆 Ranking:\n";
        ranking.forEach(([nome, info], i) => {
            rankText += `${i + 1}. ${nome} - ${info.tempo} segundos\n`;
        });
        document.getElementById("result").textContent = rankText;
    }
});

