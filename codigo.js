// =======================================================
// ALUNO: Edite apenas as variáveis abaixo
// =======================================================
const nomeAluno1 = "Insira o nome do Aluno 1 aqui";
const arquivoGLB_Aluno1 = "./aviaozinho.glb"; // Caminho do seu modelo 3D
const descricao_Aluno1 = "Descreva seu objeto aqui (ex: Avião de papel modelado no Blender...)";

const nomeAluno2 = "Insira o nome do Aluno 2 aqui";
const arquivoGLB_Aluno2 = "./aviaozinho.glb"; // Caminho do modelo do seu colega
const descricao_Aluno2 = "Descreva seu objeto aqui (ex: Avião de papel modelado no Blender...)";
// =======================================================

/**
 * Função responsável por criar e renderizar um modelo 3D em um container específico da página.
 * @param {string} containerId - O ID da div (HTML) onde o modelo será exibido.
 * @param {string} arquivoGLB - O caminho para o arquivo do modelo 3D (.glb).
 */
function criarCena(containerId, arquivoGLB) {
    // 1. Cria a Cena (O ambiente virtual onde os objetos existem)
    const cena = new THREE.Scene();
    
    // 2. Configura a Câmera (O "olho" que vê a cena)
    // Parâmetros: Campo de visão (75 graus), Proporção da tela (1:1 pois a div é 400x400), Distância mínima de visão (0.1), Distância máxima (1000)
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 80; // Afasta a câmera para conseguirmos ver o objeto inteiro
    camera.position.y = 10; // Levanta a câmera um pouco

    // 3. Configura o Renderizador (O motor que desenha a cena na tela)
    // antialias: suaviza as bordas serrilhadas do modelo
    // alpha: permite que o fundo seja transparente para vermos a cor definida no CSS
    const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderizador.setSize(400, 400); // Define o tamanho do "quadro" (canvas) em pixels
    renderizador.setClearColor(0x000000, 0); // Fundo transparente

    // Adiciona o canvas (tela de desenho gerada pelo renderizador) dentro da div correspondente no HTML
    const painel = document.getElementById(containerId);
    painel.appendChild(renderizador.domElement);

    // 4. Controles de Órbita (Permite girar o modelo com o mouse)
    const controles = new THREE.OrbitControls(camera, renderizador.domElement);
    controles.enableDamping = true; // Habilita o efeito de "inércia" ou deslizamento suave ao girar
    controles.dampingFactor = 0.05; // Define a suavidade desse deslizamento

    // 5. Iluminação (Essencial para vermos as formas, texturas e volume do objeto 3D)
    // Luz Ambiente: Ilumina o objeto por igual de todas as direções (evita que algumas partes fiquem 100% pretas)
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.7);
    cena.add(luzAmbiente);

    // Luz Direcional: Funciona como a luz do Sol apontando em uma direção (ajuda a criar sombras e destacar o formato 3D)
    const luzDirecional = new THREE.DirectionalLight(0xffffff, 0.8);
    luzDirecional.position.set(5, 10, 5); // Define onde a luz está posicionada no espaço (x, y, z)
    cena.add(luzDirecional);

    // 6. Carregamento do Modelo 3D
    const loader = new THREE.GLTFLoader(); // Cria um carregador específico para arquivos GLTF/GLB
    
    // Inicia o processo de leitura do arquivo
    loader.load(arquivoGLB, function (gltf) {
        // Função chamada assim que o carregamento for concluído
        
        const modelo = gltf.scene; // Extrai o modelo principal de dentro do arquivo
        cena.add(modelo); // Coloca o modelo dentro do nosso ambiente virtual (cena)

        // Ajusta a posição e o tamanho inicial do modelo
        modelo.position.set(0, 0, 0); // Posiciona o objeto bem no centro (x:0, y:0, z:0)
        modelo.scale.set(0.5, 0.5, 0.5); // Reduz o tamanho do objeto pela metade

        // 7. Loop de Animação (Necessário para atualizar os gráficos a cada frame da tela, como em um videogame)
        function animarModelo() {
            requestAnimationFrame(animarModelo); // Pede ao navegador para chamar esta função repetidamente
            
            // Atualiza os controles para o efeito de inércia funcionar corretamente a cada frame
            controles.update();
            
            // Tira uma "foto" da cena usando a câmera e desenha na tela
            renderizador.render(cena, camera);
        }
        
        // Dá o pontapé inicial na animação
        animarModelo();
    });
}

// 8. Inicialização quando a página carrega
// O bloco abaixo só é executado quando o HTML termina de ser lido pelo navegador
window.onload = function() {
    // Insere os nomes e descrições dos alunos nos elementos de texto do HTML
    document.getElementById("nome-aluno-1").innerText = nomeAluno1;
    document.getElementById("desc-aluno-1").innerText = descricao_Aluno1;
    
    document.getElementById("nome-aluno-2").innerText = nomeAluno2;
    document.getElementById("desc-aluno-2").innerText = descricao_Aluno2;
    
    // Dispara a função criarCena para carregar os dois modelos nos seus respectivos painéis
    criarCena("modelo1", arquivoGLB_Aluno1);
    criarCena("modelo2", arquivoGLB_Aluno2);
};
