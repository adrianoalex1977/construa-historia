document.addEventListener("DOMContentLoaded", () => {
    const storyParts = [
        "Noé construiu uma arca sob ordem de Deus.",
        "Os animais entraram na arca em pares.",
        "Deus enviou um grande dilúvio sobre a terra.",
        "Após 40 dias e 40 noites, a chuva parou.",
        "A arca repousou no monte Ararate e Noé saiu."
    ];

    // Ordem correta para verificação
    const correctOrder = [...storyParts];

    // Embaralha os trechos
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const shuffledParts = shuffle([...storyParts]);
    const storyList = document.getElementById("story-list");

    shuffledParts.forEach((part, index) => {
        let li = document.createElement("li");
        li.textContent = part;
        li.draggable = true;
        li.dataset.index = index;
        storyList.appendChild(li);
    });

    // Adiciona eventos de arrastar e soltar
    let draggedItem = null;

    document.querySelectorAll("li").forEach((li) => {
        li.addEventListener("dragstart", (e) => {
            draggedItem = li;
            setTimeout(() => (li.style.display = "none"), 0);
        });

        li.addEventListener("dragend", () => {
            draggedItem.style.display = "block";
            draggedItem = null;
        });

        li.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        li.addEventListener("drop", (e) => {
            e.preventDefault();
            if (draggedItem !== li) {
                let list = storyList.children;
                let draggedIndex = Array.from(list).indexOf(draggedItem);
                let targetIndex = Array.from(list).indexOf(li);

                // Troca os itens na lista
                if (draggedIndex > targetIndex) {
                    storyList.insertBefore(draggedItem, li);
                } else {
                    storyList.insertBefore(draggedItem, li.nextSibling);
                }
            }
        });
    });

    // Verificar a ordem
    document.getElementById("checkOrder").addEventListener("click", () => {
        let userOrder = Array.from(storyList.children).map((li) => li.textContent);
        let resultText = document.getElementById("result");

        if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
            resultText.textContent = "Parabéns! Você ordenou corretamente.";
            resultText.style.color = "green";
        } else {
            resultText.textContent = "Ops! Tente novamente.";
            resultText.style.color = "red";
        }
    });
});
