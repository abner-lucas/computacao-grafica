/**
 * PORTAL DE COMPUTAÇÃO GRÁFICA - IFPA CAMPUS BREVES
 * Script do Portal: Renderização 3D Interativa no Hero com Three.js
 */

document.addEventListener('DOMContentLoaded', () => {
    initHero3D();
});

function initHero3D() {
    const container = document.getElementById('hero-3d-canvas');
    if (!container || typeof THREE === 'undefined') return;

    // 1. Criação da Cena
    const scene = new THREE.Scene();

    // 2. Câmera
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // 3. Renderizador WebGL
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Fundo transparente
    container.appendChild(renderer.domElement);

    // 4. Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2563eb, 0.8);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // 5. Objetos 3D (Composição Geométrica Didática)
    const group = new THREE.Group();
    scene.add(group);

    // A. Icosaedro central com material translúcido
    const geoIcosahedron = new THREE.IcosahedronGeometry(1.8, 1);
    const matIcosahedron = new THREE.MeshPhongMaterial({
        color: 0x2563eb,
        wireframe: false,
        shininess: 90,
        flatShading: true,
        transparent: true,
        opacity: 0.88,
    });
    const meshCore = new THREE.Mesh(geoIcosahedron, matIcosahedron);
    group.add(meshCore);

    // B. Wireframe externo flutuante
    const geoWire = new THREE.IcosahedronGeometry(2.1, 1);
    const matWire = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
    });
    const meshWire = new THREE.Mesh(geoWire, matWire);
    group.add(meshWire);

    // C. Anel orbital (Torus)
    const geoTorus = new THREE.TorusGeometry(2.7, 0.05, 16, 100);
    const matTorus = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.6,
    });
    const torus = new THREE.Mesh(geoTorus, matTorus);
    torus.rotation.x = Math.PI / 3;
    group.add(torus);

    // D. Nuvem de partículas orbitantes
    const particlesCount = 80;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        const radius = 2.8 + Math.random() * 2.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.07,
        transparent: true,
        opacity: 0.7,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    group.add(particles);

    // 6. Interatividade com o Mouse
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (event) => {
        const rect = container.getBoundingClientRect();
        const clientX = event.clientX || (event.touches && event.touches[0].clientX) || 0;
        const clientY = event.clientY || (event.touches && event.touches[0].clientY) || 0;
        
        // Normaliza entre -1 e 1
        mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((clientY - rect.top) / rect.height) * 2 + 1;

        targetRotationY = mouseX * 1.2;
        targetRotationX = -mouseY * 0.8;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('touchmove', onPointerMove, { passive: true });

    // 7. Redimensionamento Responsivo
    const onResize = () => {
        if (!container) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', onResize);

    // 8. Loop de Animação
    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotação suave baseada no mouse com interpolação linear (damping)
        group.rotation.y += (targetRotationY - group.rotation.y) * 0.05 + 0.003;
        group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

        // Animação de pulsação e rotação contínua dos elementos
        meshWire.rotation.y -= 0.004;
        meshWire.rotation.z += 0.002;
        torus.rotation.z += 0.006;
        particles.rotation.y += 0.002;

        renderer.render(scene, camera);
    }

    animate();
}

