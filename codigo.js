// =======================================================
// ALUNO: Edite apenas as variáveis abaixo
// =======================================================
const nomeAluno1 = "Insira o nome do Aluno 1 aqui";
const arquivoGLB_Aluno1 = "./aviaozinho.glb"; // Insira o caminho do arquivo GLB

const nomeAluno2 = "Insira o nome do Aluno 2 aqui";
const arquivoGLB_Aluno2 = "./aviaozinho.glb"; // Insira o caminho do arquivo GLB
// =======================================================

function criarCena(containerId, arquivoGLB) {
    const cena = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 80;
    camera.position.y = 10;

    const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderizador.setSize(400, 400);
    renderizador.setClearColor(0x000000, 0);

    const painel = document.getElementById(containerId);
    painel.appendChild(renderizador.domElement);

    // Configurando os controles de órbita (Mouse)
    const controles = new THREE.OrbitControls(camera, renderizador.domElement);
    controles.enableDamping = true; // Adiciona inércia/suavidade ao girar
    controles.dampingFactor = 0.05;

    // Adiciona uma luz ambiente (ilumina o objeto inteiro por igual, removendo as partes pretas)
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.7);
    cena.add(luzAmbiente);

    // Mantém a luz direcional para dar profundidade e brilho
    const luzDirecional = new THREE.DirectionalLight(0xffffff, 0.8);
    luzDirecional.position.set(5, 10, 5);
    cena.add(luzDirecional);

    const loader = new THREE.GLTFLoader();
    loader.load(arquivoGLB, function (gltf) {
        const modelo = gltf.scene;
        cena.add(modelo);

        modelo.position.set(0, 0, 0);
        modelo.scale.set(0.5, 0.5, 0.5);

        function animarModelo() {
            requestAnimationFrame(animarModelo);
            
            // Atualiza os controles para o efeito de inércia funcionar
            controles.update();
            
            renderizador.render(cena, camera);
        }
        animarModelo();
    });
}

window.onload = function() {
    document.getElementById("nome-aluno-1").innerText = nomeAluno1;
    document.getElementById("nome-aluno-2").innerText = nomeAluno2;
    
    criarCena("modelo1", arquivoGLB_Aluno1);
    criarCena("modelo2", arquivoGLB_Aluno2);
};
