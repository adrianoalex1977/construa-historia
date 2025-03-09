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
    // Você pode adicionar mais versículos aqui...
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

// Função para exibir o texto embaralhado na tela
function exibirTextoEmbaralhado(texto, referencia) {
    const container = document.getElementById("story-list");
    container.innerHTML = ""; // Limpa o conteúdo anterior

    texto.forEach((linha) => {
        const li = document.createElement("li");
        li.textContent = linha;
        container.appendChild(li);
    });

    // Atualiza a referência (pode ser oculta no jogo, se quiser)
    const refContainer = document.getElementById("result");
    refContainer.textContent = `Referência: ${referencia}`;
}

// Função principal ao clicar em "Entrar"
function entrarNaSala() {
    const salaID = document.getElementById("salaID").value.trim();

    if (!salaID) {
        alert("Por favor, digite um ID de sala.");
        return;
    }

    // Atualiza a tela com o ID da sala
    document.getElementById("sala-info").textContent = `Sala: ${salaID}`;

    // Referência no banco de dados
    const salaRef = ref(database, `salas/${salaID}`);

    // Verifica se a sala já existe
    get(salaRef).then((snapshot) => {
        if (snapshot.exists()) {
            // Sala existente, carrega o texto já salvo
            const dadosSala = snapshot.val();
            console.log("Sala existente encontrada:", dadosSala);
            exibirTextoEmbaralhado(dadosSala.textoEmbaralhado, dadosSala.referencia);
        } else {
            // Sala não existe, cria nova
            const indiceAleatorio = Math.floor(Math.random() * acervoBiblico.length);
            const versiculoSelecionado = acervoBiblico[indiceAleatorio];
            const textoOriginal = versiculoSelecionado.textoOriginal;
            const referencia = versiculoSelecionado.referencia;

            // Embaralha o texto
            const textoEmbaralhado = embaralhar(textoOriginal);

            // Salva no Firebase
            set(salaRef, {
                textoOriginal: textoOriginal,
                textoEmbaralhado: textoEmbaralhado,
                referencia: referencia
            }).then(() => {
                console.log("Nova sala criada e texto salvo!");
                exibirTextoEmbaralhado(textoEmbaralhado, referencia);
            }).catch((error) => {
                console.error("Erro ao criar a sala:", error);
            });
        }
    }).catch((error) => {
        console.error("Erro ao buscar a sala:", error);
    });
}

// Adiciona o evento ao botão "Entrar"
document.getElementById("entrarSalaBtn").addEventListener("click", entrarNaSala);
