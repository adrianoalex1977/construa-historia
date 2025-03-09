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

// Acervo de versículos bíblicos
const acervoBiblico = [
    { 
        textoOriginal: [
            "No princípio, criou Deus os céus e a terra.",
            "A terra era sem forma e vazia, e havia trevas sobre a face do abismo.",
            "E o Espírito de Deus se movia sobre a face das águas.",
            "Disse Deus: Haja luz; e houve luz."
        ], 
        referencia: "Gênesis 1:1-3"
    },
    {
        textoOriginal: [
            "O Senhor é o meu pastor, nada me faltará.",
            "Ele me faz deitar em pastos verdejantes.",
            "Guia-me mansamente a águas tranquilas.",
            "Refrigera a minha alma."
        ], 
        referencia: "Salmo 23:1-3"
    },
    {
        textoOriginal: [
            "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
            "Para que todo aquele que nele crê não pereça.",
            "Mas tenha a vida eterna."
        ],
        referencia: "João 3:16"
    }
];

// Escolher aleatoriamente um dos "textoOriginal"
const historiaOriginal = acervoBiblico[Math.floor(Math.random() * acervoBiblico.length)].textoOriginal;

// Embaralha a história apenas para exibição local
let historiaExibicao = [...historiaOriginal].sort(() => Math.random() - 0.5);

// Verifica se a sala já existe e salva a ordem correta (original) no Firebase
get(salaRef).then((snapshot) => {
    if (!snapshot.exists()) {
        set(salaRef, { 
            historiaOriginal: historiaOriginal,
            jogadores: {} 
        });
    }
});

// Variáveis para controle de arrastar
let draggedItem = null;

// Quando a história estiver pronta, exibimos na tela
onValue(salaRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.historiaOriginal) {
        const storyList = document.getElementById("story-list");
        storyList.innerHTML = "";
        historiaExibicao.forEach((part) => {
            let li = document.createElement("li");
            li.textContent = part;
            li.draggable = true;

            // Eventos para Desktop (Drag and Drop)
            li.addEventListener("dragstart", handleDragStart);
            li.addEventListener("dragover", handleDragOver);
            li.addEventListener("drop", handleDrop);

            // Eventos para Celular (Touch)
            li.addEventListener("touchstart", handleTouchStart);
            li.addEventListener("touchmove", handleTouchMove);
            li.addEventListener("touchend", handleTouchEnd);

            storyList.appendChild(li);
        });
    }
});

// === Eventos para Drag and Drop (Desktop) ===
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

// === Eventos para Touch (Celular) ===
function handleTouchStart(e) {
    draggedItem = e.target;
    draggedItem.style.opacity = "0.5";

    // Captura a posição inicial do toque
    const touch = e.touches[0];
    draggedItem.startY = touch.clientY;
}

function handleTouchMove(e) {
    if (!draggedItem) return;

    e.preventDefault(); // Evita rolagem da tela ao arrastar

    const touch = e.touches[0];
    const currentY = touch.clientY;
    const storyList = document.getElementById("story-list");
    const allItems = Array.from(storyList.children);

    let closest = null;
    let closestOffset = Number.POSITIVE_INFINITY;

    allItems.forEach(item => {
        const box = item.getBoundingClientRect();
        const offset = Math.abs(currentY - box.top - box.height / 2);

        if (offset < closestOffset) {
            closestOffset = offset;
            closest = item;
        }
    });

    if (closest && closest !== draggedItem) {
        const draggedIndex = allItems.indexOf(draggedItem);
        const closestIndex = allItems.indexOf(closest);

        if (draggedIndex < closestIndex) {
            closest.after(draggedItem);
        } else {
            closest.before(draggedItem);
        }
    }
}

function handleTouchEnd() {
    if (draggedItem) {
        draggedItem.style.opacity = "1";
        draggedItem = null;
    }
}

// ⏳ Iniciar tempo
const startTime = Date.now();

// Verificar a resposta
document.getElementById("checkOrder").addEventListener("click", () => {
    let userOrder = Array.from(document.getElementById("story-list").children).map((li) => li.textContent);
    let timeTaken = (Date.now() - startTime) / 1000; // Tempo em segundos

    get(salaRef).then((snapshot) => {
        const data = snapshot.val();

        if (data && data.historiaOriginal) {
            const originalOrder = data.historiaOriginal; // Ordem original (não embaralhada)
            const isCorrectOrder = JSON.stringify(userOrder) === JSON.stringify(originalOrder);

            if (isCorrectOrder) {
                alert(`Parabéns, ${jogador}! Você acertou em ${timeTaken} segundos.`);

                // Salvar resultado do jogador no Firebase
                set(ref(database, `salas/${salaID}/jogadores/${jogador}`), {
                    tempo: timeTaken
                });
            } else {
                alert("Ops! A ordem está errada. Tente novamente.");
            }
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
