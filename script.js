import { database, ref, set, get, onValue } from "./firebase-config.js";

let salaID = prompt("Digite o ID da sala ou deixe em branco para criar uma nova:");
const jogador = prompt("Digite seu nome:");

// Cria uma nova sala se o ID estiver vazio
if (!salaID) {
    salaID = "sala-" + Math.floor(Math.random() * 100000);
    alert(`Nova sala criada! Código: ${salaID}`);
}

// Exibe o ID da sala na tela
document.getElementById("sala-info").textContent = `Sala: ${salaID}`;

// Referência para o banco de dados
const salaRef = ref(database, `salas/${salaID}`);

// Acervo de versículos bíblicos
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
        "Vós sois a luz do mundo;",
        "não se pode esconder uma cidade edificada sobre um monte.",
        "Nem se acende a candeia e se coloca debaixo do alqueire,",
        "mas no velador, e dá luz a todos que estão na casa."
    ],
    referencia: "Mateus 5:14-15"
},
{
    textoOriginal: [
        "Pedi, e dar-se-vos-á;",
        "buscai, e encontrareis;",
        "batei, e abrir-se-vos-á.",
        "Porque aquele que pede recebe; e o que busca encontra; e ao que bate se abre."
    ],
    referencia: "Mateus 7:7-8"
},
{
    textoOriginal: [
        "Entrai pela porta estreita;",
        "porque larga é a porta, e espaçoso o caminho que conduz à perdição,",
        "e muitos são os que entram por ela.",
        "E estreita é a porta, e apertado o caminho que leva à vida, e poucos há que a encontrem."
    ],
    referencia: "Mateus 7:13-14"
},
{
    textoOriginal: [
        "Vinde a mim, todos os que estais cansados e oprimidos,",
        "e eu vos aliviarei.",
        "Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração;",
        "e encontrareis descanso para as vossas almas."
    ],
    referencia: "Mateus 11:28-29"
},
{
    textoOriginal: [
        "Porque, onde estiver o vosso tesouro,",
        "aí estará também o vosso coração.",
        "A candeia do corpo são os olhos;",
        "de sorte que, se os teus olhos forem bons, todo o teu corpo terá luz."
    ],
    referencia: "Mateus 6:21-22"
},
{
    textoOriginal: [
        "Mas, buscai primeiro o reino de Deus,",
        "e a sua justiça,",
        "e todas estas coisas vos serão acrescentadas.",
        "Não vos inquieteis, pois, pelo dia de amanhã."
    ],
    referencia: "Mateus 6:33-34"
},
{
    textoOriginal: [
        "Ide, pois, e fazei discípulos de todas as nações,",
        "batizando-os em nome do Pai, e do Filho, e do Espírito Santo,",
        "ensinando-os a guardar todas as coisas que eu vos tenho mandado.",
        "E eis que eu estou convosco todos os dias, até à consumação dos séculos."
    ],
    referencia: "Mateus 28:19-20"
},
{
    textoOriginal: [
        "E Jesus, tendo saído, viu uma grande multidão,",
        "e possuído de íntima compaixão para com eles,",
        "curou os seus enfermos.",
        "E ao cair da tarde, chegaram-se a ele os seus discípulos, dizendo: O lugar é deserto, e já a hora é avançada."
    ],
    referencia: "Mateus 14:14-15"
},
{
    textoOriginal: [
        "O qual, quando ainda estava longe, viu-o seu pai,",
        "e se moveu de íntima compaixão,",
        "e, correndo, lançou-se-lhe ao pescoço",
        "e o beijou."
    ],
    referencia: "Lucas 15:20"
},
{
    textoOriginal: [
        "Porque o Filho do homem veio buscar e salvar",
        "o que se havia perdido.",
        "Disse-lhes Jesus uma parábola sobre a necessidade de orar sempre",
        "e nunca desfalecer."
    ],
    referencia: "Lucas 19:10 / Lucas 18:1"
},
{
    textoOriginal: [
        "Bem-aventurados vós, os pobres,",
        "porque vosso é o reino de Deus.",
        "Bem-aventurados vós, que agora tendes fome,",
        "porque sereis fartos."
    ],
    referencia: "Lucas 6:20-21"
},
{
    textoOriginal: [
        "E ele lhes disse: Por que estais perturbados,",
        "e por que sobem tais pensamentos aos vossos corações?",
        "Vede as minhas mãos e os meus pés, que sou eu mesmo;",
        "apalpai-me e vede, pois um espírito não tem carne nem ossos, como vedes que eu tenho."
    ],
    referencia: "Lucas 24:38-39"
},
{
    textoOriginal: [
        "Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós;",
        "e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judeia e Samaria,",
        "e até aos confins da terra.",
        "E, quando dizia isto, vendo-o eles, foi elevado às alturas."
    ],
    referencia: "Atos 1:8-9 (Conectado a Lucas)"
},
{
    textoOriginal: [
        "No princípio era o Verbo,",
        "e o Verbo estava com Deus,",
        "e o Verbo era Deus.",
        "Ele estava no princípio com Deus."
    ],
    referencia: "João 1:1-2"
},
{
    textoOriginal: [
        "E o Verbo se fez carne,",
        "e habitou entre nós,",
        "cheio de graça e de verdade,",
        "e vimos a sua glória, como a glória do unigênito do Pai."
    ],
    referencia: "João 1:14"
},
{
    textoOriginal: [
        "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito,",
        "para que todo aquele que nele crê não pereça,",
        "mas tenha a vida eterna.",
        "Porque Deus enviou o seu Filho ao mundo, não para condenar o mundo, mas para que o mundo fosse salvo por ele."
    ],
    referencia: "João 3:16-17"
},
{
    textoOriginal: [
        "Eu sou o bom Pastor;",
        "o bom Pastor dá a sua vida pelas ovelhas.",
        "Eu sou o bom Pastor, e conheço as minhas ovelhas,",
        "e das minhas sou conhecido."
    ],
    referencia: "João 10:11,14"
},
{
    textoOriginal: [
        "Eu sou a videira verdadeira,",
        "e meu Pai é o lavrador.",
        "Toda vara em mim que não dá fruto, a tira;",
        "e limpa toda aquela que dá fruto, para que dê mais fruto."
    ],
    referencia: "João 15:1-2"
},
{
    textoOriginal: [
        "Deixo-vos a paz, a minha paz vos dou;",
        "não vo-la dou como o mundo a dá.",
        "Não se turbe o vosso coração,",
        "nem se atemorize."
    ],
    referencia: "João 14:27"
},
{
    textoOriginal: [
        "Jesus chorou.",
        "Disseram, pois, os judeus: Vede como o amava.",
        "E alguns deles disseram: Não podia ele, que abriu os olhos ao cego, fazer também com que este não morresse?",
        "Jesus, pois, movendo-se outra vez muito em si mesmo, foi ao sepulcro."
    ],
    referencia: "João 11:35-38"
},
{
    textoOriginal: [
        "Em verdade, em verdade vos digo que aquele que crê em mim",
        "tem a vida eterna.",
        "Eu sou o pão da vida.",
        "Vossos pais comeram o maná no deserto e morreram."
    ],
    referencia: "João 6:47-49"
},
{
    textoOriginal: [
        "Eu sou o caminho, e a verdade, e a vida;",
        "ninguém vem ao Pai,",
        "senão por mim.",
        "Se vós me conhecêsseis, também conheceríeis a meu Pai."
    ],
    referencia: "João 14:6-7"
},
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
        "O Senhor é o meu pastor; nada me faltará.",
        "Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.",
        "Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.",
        "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo."
    ], 
    referencia: "Salmos 23:1-4"
},
{
    textoOriginal: [
        "Bem-aventurados os pobres de espírito, porque deles é o reino dos céus.",
        "Bem-aventurados os que choram, porque eles serão consolados.",
        "Bem-aventurados os mansos, porque eles herdarão a terra.",
        "Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos."
    ],
    referencia: "Mateus 5:3-6"
},
{
    textoOriginal: [
        "Honra a teu pai e a tua mãe, como o Senhor teu Deus te ordenou.",
        "Para que se prolonguem os teus dias,",
        "e para que te vá bem na terra que o Senhor teu Deus te dá.",
        "Este é o primeiro mandamento com promessa."
    ],
    referencia: "Deuteronômio 5:16 / Efésios 6:2"
},
{
    textoOriginal: [
        "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
        "Tomai sobre vós o meu jugo, e aprendei de mim, que sou manso e humilde de coração.",
        "E encontrareis descanso para as vossas almas.",
        "Porque o meu jugo é suave e o meu fardo é leve."
    ],
    referencia: "Mateus 11:28-30"
},
{
    textoOriginal: [
        "O Senhor é a minha luz e a minha salvação; a quem temerei?",
        "O Senhor é a força da minha vida; de quem me recearei?",
        "Quando os malvados, meus adversários e meus inimigos, investiram contra mim para comerem as minhas carnes, tropeçaram e caíram.",
        "Ainda que um exército me cercasse, o meu coração não temeria."
    ],
    referencia: "Salmos 27:1-3"
},
{
    textoOriginal: [
        "Portanto, ide, ensinai todas as nações,",
        "batizando-as em nome do Pai, e do Filho, e do Espírito Santo;",
        "ensinando-as a guardar todas as coisas que eu vos tenho mandado.",
        "E eis que eu estou convosco todos os dias, até à consumação dos séculos."
    ],
    referencia: "Mateus 28:19-20"
},
{
    textoOriginal: [
        "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
        "Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.",
        "Porque ele te livrará do laço do passarinheiro, e da peste perniciosa.",
        "Ele te cobrirá com as suas penas, e debaixo das suas asas te confiarás."
    ],
    referencia: "Salmos 91:1-4"
},
{
    textoOriginal: [
        "O amor é paciente, o amor é bondoso.",
        "Não inveja, não se vangloria, não se orgulha.",
        "Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.",
        "Tudo sofre, tudo crê, tudo espera, tudo suporta."
    ],
    referencia: "1 Coríntios 13:4-7"
},
{
    textoOriginal: [
        "Ainda que eu falasse as línguas dos homens e dos anjos, e não tivesse amor,",
        "seria como o metal que soa ou como o sino que tine.",
        "E ainda que tivesse o dom de profecia, e conhecesse todos os mistérios e toda a ciência,",
        "e ainda que tivesse toda a fé, de maneira tal que transportasse os montes, e não tivesse amor, nada seria."
    ],
    referencia: "1 Coríntios 13:1-2"
},
{
    textoOriginal: [
        "Buscai ao Senhor enquanto se pode achar,",
        "invocai-o enquanto está perto.",
        "Deixe o ímpio o seu caminho, e o homem maligno os seus pensamentos,",
        "e se converta ao Senhor, que se compadecerá dele."
    ],
    referencia: "Isaías 55:6-7"
},
{
    textoOriginal: [
        "Não temas, porque eu sou contigo;",
        "não te assombres, porque eu sou o teu Deus;",
        "eu te fortaleço, e te ajudo,",
        "e te sustento com a destra da minha justiça."
    ],
    referencia: "Isaías 41:10"
},
{
    textoOriginal: [
        "Porque para tudo há uma ocasião,",
        "e um tempo para cada propósito debaixo do céu:",
        "há tempo de nascer e tempo de morrer,",
        "tempo de plantar e tempo de arrancar o que se plantou."
    ],
    referencia: "Eclesiastes 3:1-2"
},
{
    textoOriginal: [
        "Por isso vos digo: não andeis cuidadosos quanto à vossa vida,",
        "pelo que haveis de comer ou pelo que haveis de beber;",
        "nem quanto ao vosso corpo, pelo que haveis de vestir.",
        "Não é a vida mais do que o mantimento, e o corpo mais do que o vestuário?"
    ],
    referencia: "Mateus 6:25"
},
{
    textoOriginal: [
        "Aleluia! Louvai a Deus no seu santuário,",
        "louvai-o no firmamento do seu poder.",
        "Louvai-o pelos seus atos poderosos,",
        "louvai-o conforme a excelência da sua grandeza."
    ],
    referencia: "Salmos 150:1-2"
},
{
    textoOriginal: [
        "O Senhor é bom, uma fortaleza no dia da angústia,",
        "e conhece os que confiam nele.",
        "Ainda que o inimigo venha como uma corrente de águas,",
        "o Espírito do Senhor arvorará contra ele a sua bandeira."
    ],
    referencia: "Naum 1:7 + Isaías 59:19"
},
{
    textoOriginal: [
        "Bendize, ó minha alma, ao Senhor,",
        "e tudo o que há em mim bendiga o seu santo nome.",
        "Bendize, ó minha alma, ao Senhor,",
        "e não te esqueças de nenhum de seus benefícios."
    ],
    referencia: "Salmos 103:1-2"
},
{
    textoOriginal: [
        "O choro pode durar uma noite,",
        "mas a alegria vem pela manhã.",
        "Cantai ao Senhor, vós que sois seus santos,",
        "e dai graças ao seu santo nome."
    ],
    referencia: "Salmos 30:4-5"
},
{
    textoOriginal: [
        "Sede fortes e corajosos. Não temais,",
        "nem vos atemorizeis por causa deles,",
        "pois o Senhor vosso Deus é quem vai convosco;",
        "não vos deixará nem vos desamparará."
    ],
    referencia: "Deuteronômio 31:6"
},
{
    textoOriginal: [
        "Não se turbe o vosso coração; credes em Deus,",
        "crede também em mim.",
        "Na casa de meu Pai há muitas moradas;",
        "vou preparar-vos lugar."
    ],
    referencia: "João 14:1-2"
},
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

// Variáveis para controle de arrastar e soltar
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

            // Eventos para desktop (drag-and-drop)
            li.addEventListener("dragstart", handleDragStart);
            li.addEventListener("dragover", handleDragOver);
            li.addEventListener("drop", handleDrop);

            // Eventos para dispositivos móveis (touch)
            li.addEventListener("touchstart", handleTouchStart);
            li.addEventListener("touchmove", handleTouchMove);
            li.addEventListener("touchend", handleTouchEnd);

            storyList.appendChild(li);
        });
    }
});

// Funções para Drag and Drop (Desktop)
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

// Funções para toque (Touch)
function handleTouchStart(e) {
    draggedItem = e.target;
    e.target.style.opacity = "0.5";
}

function handleTouchMove(e) {
    e.preventDefault();
    let touchLocation = e.touches[0];
    let elementUnder = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);

    if (elementUnder && elementUnder.tagName === "LI" && elementUnder !== draggedItem) {
        elementUnder.parentNode.insertBefore(draggedItem, elementUnder.nextSibling);
    }
}

function handleTouchEnd(e) {
    e.target.style.opacity = "1";
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

        if (data && data.historiaOriginal) {
            // Comparação da ordem correta (historiaOriginal) com a ordem do jogador
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