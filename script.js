import { database, ref, set, get, push } from "./firebase-config.js";

// Acervo de versículos (adicione quantos quiser)
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
}
  // Adicione outros versículos conforme necessário...
];

// Função para embaralhar o array (usada para embaralhar as frases)
function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Variáveis globais para armazenar estado do jogo
let textoOriginalGlobal = [];
let referenciaGlobal = "";
let salaIDGlobal = "";
let nomeJogadorGlobal = "";
let tempoInicial;
let intervaloTempo;

// Função para iniciar o cronômetro
function iniciarCronometro() {
  tempoInicial = Date.now();
  intervaloTempo = setInterval(() => {
    const tempoAtual = Math.floor((Date.now() - tempoInicial) / 1000);
    document.getElementById("result").innerText = `⏱️ Tempo: ${tempoAtual} segundos`;
  }, 1000);
}

// Função para parar o cronômetro e retornar o tempo em segundos
function pararCronometro() {
  clearInterval(intervaloTempo);
  return Math.floor((Date.now() - tempoInicial) / 1000);
}

// Função para exibir o texto embaralhado na tela e iniciar o drag & drop
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

  // Exibe a referência (opcional)
  document.getElementById("result").textContent = `Referência: ${referencia}`;

  // Ativa o drag & drop e inicia o cronômetro
  ativarDragAndDrop();
  iniciarCronometro();
}

// Função para ativar drag & drop (mouse e touch)
function ativarDragAndDrop() {
  const listItems = document.querySelectorAll("#story-list li");
  let draggedItem = null;

  listItems.forEach((item) => {
    // Eventos para mouse
    item.addEventListener("dragstart", function (e) {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = "none";
      }, 0);
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
    item.addEventListener("drop", function (e) {
      e.preventDefault();
      if (draggedItem !== this) {
        const allItems = [...document.querySelectorAll("#story-list li")];
        const draggedIndex = allItems.indexOf(draggedItem);
        const droppedIndex = allItems.indexOf(this);
        if (draggedIndex < droppedIndex) {
          this.parentNode.insertBefore(draggedItem, this.nextSibling);
        } else {
          this.parentNode.insertBefore(draggedItem, this);
        }
      }
    });

    // Eventos para touch (mobile)
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

// Evento do botão "Verificar Ordem"
document.getElementById("checkOrder").addEventListener("click", () => {
  const tempoFinal = pararCronometro();
  const userOrder = Array.from(document.getElementById("story-list").children).map(li => li.textContent.trim());
  const isCorrect = JSON.stringify(userOrder) === JSON.stringify(textoOriginalGlobal);

  // Grava o resultado no ranking do Firebase
  const rankingRef = ref(database, `salas/${salaIDGlobal}/ranking`);
  push(rankingRef, {
    jogador: nomeJogadorGlobal,
    tempo: tempoFinal,
    resultado: isCorrect ? "Acertou" : "Errou",
    timestamp: new Date().toISOString()
  }).then(() => {
    if (isCorrect) {
      alert(`Parabéns, ${nomeJogadorGlobal}! Você acertou em ${tempoFinal} segundos.`);
      
      // Busca o ranking dos jogadores que acertaram, ordena do mais rápido ao mais lento e exibe
      get(rankingRef).then((snapshot) => {
        if (snapshot.exists()) {
          let rankingList = [];
          snapshot.forEach(childSnapshot => {
            let record = childSnapshot.val();
            if (record.resultado === "Acertou") {
              rankingList.push(record);
            }
          });
          rankingList.sort((a, b) => a.tempo - b.tempo);
          let rankingText = "🏆 Ranking de Acertos:\n";
          rankingList.forEach((r, i) => {
            rankingText += `${i + 1}. ${r.jogador} - ${r.tempo} segundos\n`;
          });
          document.getElementById("result").innerText = rankingText;
        } else {
          document.getElementById("result").innerText = "Nenhum jogador acertou ainda.";
        }
      }).catch(error => console.error("Erro ao buscar ranking:", error));
      
    } else {
      alert("Ops! A ordem está incorreta. Tente novamente.");
    }
  }).catch((error) => {
    console.error("Erro ao gravar no ranking:", error);
  });
});

// Função para entrar na sala
function entrarNaSala() {
  salaIDGlobal = document.getElementById("salaID").value.trim();
  nomeJogadorGlobal = document.getElementById("nomeJogador").value.trim();

  if (!salaIDGlobal || !nomeJogadorGlobal) {
    alert("Por favor, preencha o ID da sala e seu nome.");
    return;
  }

  document.getElementById("sala-info").textContent = `Sala: ${salaIDGlobal} | Jogador: ${nomeJogadorGlobal}`;
  const salaRef = ref(database, `salas/${salaIDGlobal}`);

  get(salaRef).then((snapshot) => {
    if (snapshot.exists()) {
      // Se a sala já existir, carrega o texto salvo
      const data = snapshot.val();
      textoOriginalGlobal = data.textoOriginal;
      referenciaGlobal = data.referencia;
      exibirTextoEmbaralhado(data.textoEmbaralhado, referenciaGlobal);
    } else {
      // Se a sala não existir, seleciona um versículo aleatório e cria a sala
      const indiceAleatorio = Math.floor(Math.random() * acervoBiblico.length);
      const versiculoSelecionado = acervoBiblico[indiceAleatorio];
      textoOriginalGlobal = versiculoSelecionado.textoOriginal;
      referenciaGlobal = versiculoSelecionado.referencia;
      const textoEmbaralhado = embaralhar(textoOriginalGlobal);

      set(salaRef, {
        textoOriginal: textoOriginalGlobal,
        textoEmbaralhado: textoEmbaralhado,
        referencia: referenciaGlobal
      }).then(() => {
        exibirTextoEmbaralhado(textoEmbaralhado, referenciaGlobal);
      }).catch((error) => {
        console.error("Erro ao criar a sala:", error);
      });
    }
  }).catch((error) => {
    console.error("Erro ao buscar a sala:", error);
  });
}

// Evento do botão "Entrar" na sala
document.getElementById("entrarSalaBtn").addEventListener("click", entrarNaSala);
