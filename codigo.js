function executar() { // Declara a função executar; () indica que não recebe parâmetros.
    cena = new THREE.Scene(); // Cria uma cena 3D; new instancia a classe Scene da biblioteca THREE.

    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Cria câmera em perspectiva: visão 75°, proporção 1, limite próximo 0.1 e distante 1000.
    // camera.position.z = 2; // Linha desativada; definiria a posição Z da câmera como 2.
    camera.position.z = 80; // Define a posição da câmera no eixo Z.
    camera.position.y = 10; // Define a posição da câmera no eixo Y.

    renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Cria o renderizador WebGL; alpha habilita fundo transparente.
    renderizador.setSize(500, 500); // setSize define largura e altura da renderização.
    renderizador.setClearColor(0x000000, 0); // Fundo transparente para mostrar o CSS.

    painel = document.getElementById("modelo"); // Busca no HTML o elemento cujo id é "modelo".
    painel.appendChild(renderizador.domElement); // Insere no painel o canvas criado pelo renderizador.

    // Adiciona luz ao modelo.
    const luz = new THREE.DirectionalLight(0xffffff, 1); // const cria luz; DirectionalLight gera luz direcional branca com intensidade 1.
    luz.position.set(5, 5, 5); // Define posição X, Y e Z da luz.
    cena.add(luz); // Adiciona a luz à cena.

    // Carrega o modelo 3D.
    const loader = new THREE.GLTFLoader(); // Cria o carregador de arquivos GLTF/GLB.
    loader.load( // load inicia o carregamento do arquivo.
        './aviaozinho.glb', // Caminho relativo do arquivo 3D.
        function (gltf) { // Função executada após o carregamento; gltf recebe o modelo carregado.
            const modelo = gltf.scene; // Obtém a cena principal do arquivo GLTF/GLB.
            cena.add(modelo); // Adiciona o modelo à cena.

            // Ajusta posição e escala.
            modelo.position.set(0, 0, 0); // Define posição X, Y e Z do modelo.
            modelo.scale.set(0.5, 0.5, 0.5); // Reduz o modelo para 50% nos três eixos.

            function animarModelo() { // Declara a função que anima o modelo.
                requestAnimationFrame(animarModelo); // Chama a função novamente no próximo quadro.
                modelo.rotation.y += 0.01; // Gira o modelo no eixo Y.
                renderizador.render(cena, camera); // Desenha a cena pela visão da câmera.
            } // Fim da função animarModelo.
            animarModelo(); // Inicia a animação.
        } // Fim da função executada após o carregamento.
    ); // Fim da chamada loader.load().
} // Fim da função executar.

window.onload = executar; // Executa a função quando a página terminar de carregar.
