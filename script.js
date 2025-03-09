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
        storyList.innerHTML = "";  // Limpa a lista anterior

        data.historia.forEach((part, index) => {
            let li = document.createElement("li");
            li.textContent = part;
            li.draggable = true;  // Permite arrastar o item
            li.setAttribute('data-index', index);  // Adiciona um atributo para identificar a ordem original

            // Adiciona os eventos de drag-and-drop
            li.addEventListener("dragstart", dragStart);
            li.addEventListener("dragover", dragOver);
            li.addEventListener("drop", drop);
            li.addEventListener("dragenter", dragEnter);
            li.addEventListener("dragleave", dragLeave);

            storyList.appendChild(li);
        });
    }
});

// ⏳ Iniciar tempo
const startTime = Date.now();

// Verificar a resposta
document.getElementById("checkOrder").addEventListener("click", () => {
    let userOrder = Array.from(document.getElementById("story-list").children).map((li) => li.textContent);
    let timeTaken = (Date.now() - startTime) / 1000; // Tempo em segundos

    get(salaRef).then((snapshot) => {
        const data = snapshot.val();
        if (JSON.stringify(userOrder) === JSON.stringify(data.historia.sort())) {
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

// Funções de Drag-and-Drop

// Função para iniciar o arrasto
let draggedItem = null;
function dragStart(e) {
    draggedItem = e.target;
    e.target.style.opacity = "0.5";  // Deixa o item transparente enquanto é arrastado
}

// Função para permitir o arrasto sobre a lista
function dragOver(e) {
    e.preventDefault();
}

// Função para quando o item for solto
function drop(e) {
    e.preventDefault();
    if (e.target.tagName === "LI" && e.target !== draggedItem) {
        let draggedIndex = draggedItem.getAttribute("data-index");
        let targetIndex = e.target.getAttribute("data-index");

        // Troca o texto entre os dois itens
        let temp = draggedItem.textContent;
        draggedItem.textContent = e.target.textContent;
        e.target.textContent = temp;

        // Atualiza o índice
        draggedItem.setAttribute("data-index", targetIndex);
        e.target.setAttribute("data-index", draggedIndex);
    }
    draggedItem.style.opacity = "1";
    draggedItem = null;
}

// Função de hover para destacar o item enquanto ele é arrastado
function dragEnter(e) {
    if (e.target.tagName === "LI") {
        e.target.style.border = "2px dashed #ccc";
    }
}

// Função para remover o destaque
function dragLeave(e) {
    if (e.target.tagName === "LI") {
        e.target.style.border = "";
    }
}
