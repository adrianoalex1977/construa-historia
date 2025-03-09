import { database, ref, set, get } from "./firebase-config.js";

// Pegando o ID da sala e o nome do jogador
let salaID = prompt("Digite o ID da sala ou deixe em branco para criar uma nova:");
const jogador = prompt("Digite seu nome:");

// Cria um novo ID aleatório se o usuário não digitar nada
if (!salaID) {
    salaID = "sala-" + Math.floor(Math.random() * 100000);
    alert(`Nova sala criada! Código: ${salaID}`);
}

// Atualiza o texto na tela com o ID da sala
document.getElementById("sala-info").textContent = `Sala: ${salaID}`;

// Referência da sala no Firebase
const salaRef = ref(database, `salas/${salaID}`);

// Acervo de versículos bíblicos (aqui vai o seu acervo completo...)
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
    // ... (outros versículos)
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

// Verificar se a sala existe e trazer o texto ou criar um novo
get(salaRef).then((snapshot) => {
    if (snapshot.exists()) {
        // Sala já existe, carrega o texto salvo
        const dadosSala = snapshot.val();
        console.log("Sala existente encontrada:", dadosSala);
        exibirTextoEmbaralhado(dadosSala.textoEmbaralhado, dadosSala.referencia);
    } else {
        // Sala não existe, cria um novo versículo aleatório
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
            referencia: referencia,
            jogadores: { [jogador]: true } // Marca o jogador que entrou
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

// Função para exibir o texto embaralhado na tela
function exibirTextoEmbaralhado(texto, referencia) {
    const container = document.getElementById("texto-embaralhado");
    container.innerHTML = ""; // Limpa o conteúdo anterior
    texto.forEach((linha) => {
        const p = document.createElement("p");
        p.textContent = linha;
        container.appendChild(p);
    });

    // Exibe a referência (pode deixar oculta, se for parte do jogo)
    const refContainer = document.getElementById("referencia");
    refContainer.textContent = `Referência: ${referencia}`;
}