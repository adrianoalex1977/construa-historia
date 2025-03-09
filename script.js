import { database, ref, set, get, onValue } from "./firebase-config.js";

// Inicializa o formulário de entrada
const salaIDInput = document.getElementById("salaID");
const entrarSalaBtn = document.getElementById("entrarSalaBtn");

// Aguardar o clique para entrar ou criar uma sala
entrarSalaBtn.addEventListener("click", () => {
    let salaID = salaIDInput.value.trim(); // Pega o ID da sala do input
    const jogador = prompt("Digite seu nome:");

    // Se não houver ID da sala, cria uma nova
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
            data.historia.forEach((part) => {
                let li = document.createElement("li");
                li.textContent = part;
                li.draggable = true;
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
});
