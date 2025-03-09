import { database, ref, set, get, push } from "./firebase-config.js";

// Acervo de versículos
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
    // Adicione mais versículos aqui
];

// Função para embaralhar o texto
function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// Variáveis globais para acessar depois
let textoOriginalGlobal = [];
let referenciaGlobal = "";
let salaIDGlobal = "";
let nomeJogadorGlobal = "";

// Função para exibir o texto embaralhado
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

    const refContainer = document.getElementById("result");
    refContainer.textContent = `Referência: ${referencia}`;

    ativarDragAndDrop();
}

// Ativar o Drag and Drop (mouse e touch)
function ativarDragAndDrop() {
    const listItems = document.querySelectorAll("#story-list li");
    let draggedItem = null;

    listItems.forEach((item) => {
        // Mouse
        item.addEventListener("dragstart", function (e) {
            draggedItem = item;
            setTimeout(() => item.style.display = "none", 0);
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

        item.addEventListener("dragenter", function (e) {
            e.preventDefault();
            this.classList.add("drag-over");
        });

        item.addEventListener("dragleave", function (e) {
            this.classList.remove("drag-over");
        });

        item.addEventListener("drop", function (e) {
            e.preventDefault();
            this.classList.remove("drag-over");

            if (draggedItem !== this) {
                const allItems = [...document.querySelectorAll("#story-list li")];
                const fromIndex = allItems.indexOf(draggedItem);
                const toIndex = allItems.indexOf(this);

                if (fromIndex < toIndex) {
                    this.parentNode.insertBefore(draggedItem, this.nextSibling);
                } else {
                    this.parentNode.insertBefore(draggedItem, this);
                }
            }
        });

        // Touch
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

// Função Verificar Ordem
document.getElementById("checkOrder").addEventListener("click", () => {
    const itensOrdenados = Array.from(document.querySelectorAll("#story-list li")).map(li => li.textContent.trim());
    const correto = JSON.stringify(itensOrdenados) === JSON.stringify(textoOriginalGlobal);
    const resultado = correto ? "✅ Parabéns, você acertou!" : "❌ A ordem está incorreta. Tente novamente.";
    alert(resultado);

    // Salvar resultado no ranking
    const rankingRef = ref(database, `salas/${salaIDGlobal}/ranking`);
    push(rankingRef, {
        jogador: nomeJogadorGlobal,
        resultado: correto ? "Acertou" : "Errou",
        data: new Date().toISOString()
    });
});

// Função principal para entrar na sala
function entrarNaSala() {
    salaIDGlobal = document.getElementById("salaID").value.trim();
    nomeJogadorGlobal = document.getElementById("nomeJogador").value.trim();

    if (!salaIDGlobal || !nomeJogadorGlobal) {
        alert("Por favor, preencha seu nome e o ID da sala.");
        return;
    }

    document.getElementById("sala-info").textContent = `Sala: ${salaIDGlobal}`;

    const salaRef = ref(database, `salas/${salaIDGlobal}`);

    get(salaRef).then((snapshot) => {
        if (snapshot.exists()) {
            const dadosSala = snapshot.val();
            textoOriginalGlobal = dadosSala.textoOriginal;
            referenciaGlobal = dadosSala.referencia;
            exibirTextoEmbaralhado(dadosSala.textoEmbaralhado, referenciaGlobal);
        } else {
            const indiceAleatorio = Math.floor(Math.random() * acervoBiblico.length);
            const versiculo = acervoBiblico[indiceAleatorio];
            textoOriginalGlobal = versiculo.textoOriginal;
            referenciaGlobal = versiculo.referencia;
            const embaralhado = embaralhar(textoOriginalGlobal);

            set(salaRef, { textoOriginal: textoOriginalGlobal, textoEmbaralhado: embaralhado, referencia: referenciaGlobal });
            exibirTextoEmbaralhado(embaralhado, referenciaGlobal);
        }
    });
}

document.getElementById("entrarSalaBtn").addEventListener("click", entrarNaSala);
