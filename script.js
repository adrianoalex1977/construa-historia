import { database, ref, set, get } from "./firebase-config.js";

// Acervo de versículos bíblicos (adicione o acervo completo conforme desejar)
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
    // Adicione mais versículos conforme necessário...
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

// Função para exibir o texto embaralhado na tela (com drag and drop)
function exibirTextoEmbaralhado(texto, referencia) {
    const container = document.getElementById("story-list");
    container.innerHTML = ""; // Limpa o conteúdo anterior

    texto.forEach((linha) => {
        const li = document.createElement("li");
        li.textContent = linha;
        li.setAttribute("draggable", "true");
        li.classList.add("draggable-item");
        container.appendChild(li);
    });

    // Atualiza a referência
    const refContainer = document.getElementById("result");
    refContainer.textContent = `Referência: ${referencia}`;

    // Ativar arrastar e soltar
    ativarDragAndDrop();
}

// Função para ativar drag and drop com mouse e touch
function ativarDragAndDrop() {
    const listItems = document.querySelectorAll("#story-list li");
    let draggedItem = null;

    listItems.forEach((item) => {
        // Eventos para Mouse
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

        // Eventos para Touch (Celular)
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

            const currentItem = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            );

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

// Função principal ao clicar em "Entrar"
function entrarNaSala() {
    const salaID = document.getElementById("salaID").value.trim();

    if (!salaID) {
        alert("Por favor, digite um ID de sala.");
        return;
    }

    document.getElementById("sala-info").textContent = `Sala: ${salaID}`;
    const salaRef = ref(database, `salas/${salaID}`);

    get(salaRef).then((snapshot) => {
        if (snapshot.exists()) {
            const dadosSala = snapshot.val();
            console.log("Sala existente encontrada:", dadosSala);
            exibirTextoEmbaralhado(dadosSala.textoEmbaralhado, dadosSala.referencia);
        } else {
            const indiceAleatorio = Math.floor(Math.random() * acervoBiblico.length);
            const versiculoSelecionado = acervoBiblico[indiceAleatorio];
            const textoOriginal = versiculoSelecionado.textoOriginal;
            const referencia = versiculoSelecionado.referencia;
            const textoEmbaralhado = embaralhar(textoOriginal);

            set(salaRef, {
                textoOriginal: textoOriginal,
                textoEmbaralhado: textoEmbaralhado,
                referencia: referencia
            }).then(() => {
                console.log("Nova sala criada e texto salvo!");
                exibirTextoEmbaralhado(textoEmbaralhado, referencia);
            }).catch((error) => console.error("Erro ao criar a sala:", error));
        }
    }).catch((error) => console.error("Erro ao buscar a sala:", error));
}

// Adiciona o evento ao botão "Entrar"
document.getElementById("entrarSalaBtn").addEventListener("click", entrarNaSala);
