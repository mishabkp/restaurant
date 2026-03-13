// ========================================
// FOOD VISTA - 3D EXPLODED SHOWCASE
// Uses Three.js & GSAP ScrollTrigger
// ========================================

function initProductShowcase() {
    const container = document.getElementById('showcase3DContainer');
    if (!container || typeof THREE === 'undefined' || typeof gsap === 'undefined') return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffa500, 2, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0xffffff, 1, 15);
    rimLight.position.set(-5, -5, 2);
    scene.add(rimLight);

    // --- Layers Configuration ---
    // We'll create stylized 3D layers for a "Signature Burger"
    const layers = [];
    const layerData = [
        { name: 'Top Bun', color: 0xD2691E, height: 0.4, yOffset: 1.5, radius: 1.2 },
        { name: 'Lettuce', color: 0x32CD32, height: 0.1, yOffset: 0.9, radius: 1.3 },
        { name: 'Cheese', color: 0xFFD700, height: 0.05, yOffset: 0.7, radius: 1.25 },
        { name: 'Patty', color: 0x8B4513, height: 0.3, yOffset: 0.4, radius: 1.2 },
        { name: 'Tomato', color: 0xFF6347, height: 0.1, yOffset: 0.1, radius: 1.15 },
        { name: 'Bottom Bun', color: 0xD2691E, height: 0.3, yOffset: -0.3, radius: 1.2 }
    ];

    layerData.forEach((data, index) => {
        const geometry = new THREE.CylinderGeometry(data.radius, data.radius * (data.name.includes('Bun') ? 0.9 : 1), data.height, 32);
        const material = new THREE.MeshStandardMaterial({ 
            color: data.color, 
            roughness: 0.4,
            metalness: 0.2
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = data.yOffset;
        
        // Add random rotation for organic feel
        mesh.rotation.y = Math.random() * Math.PI;
        
        scene.add(mesh);
        layers.push({ mesh, originalY: data.yOffset });
    });

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);
        layers.forEach(layer => {
            layer.mesh.rotation.y += 0.005;
        });
        renderer.render(scene, camera);
    }
    animate();

    // --- GSAP ScrollTrigger Integration ---
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".showcase-sticky-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            // markers: true, // For debugging
        }
    });

    // Explode layers
    layers.forEach((layer, i) => {
        const factor = (i - (layers.length / 2)) * 1.5;
        tl.to(layer.mesh.position, {
            y: layer.originalY + factor,
            ease: "power2.inOut"
        }, 0);
        
        // Rotate while exploding
        tl.to(layer.mesh.rotation, {
            x: Math.PI * 0.2,
            z: Math.PI * 0.1,
            ease: "power2.inOut"
        }, 0);
    });

    // Animate text elements
    tl.from(".showcase-text-1", { opacity: 0, y: 100, duration: 0.2 }, 0.1);
    tl.to(".showcase-text-1", { opacity: 0, y: -100, duration: 0.2 }, 0.3);
    
    tl.from(".showcase-text-2", { opacity: 0, y: 100, duration: 0.2 }, 0.4);
    tl.to(".showcase-text-2", { opacity: 0, y: -100, duration: 0.2 }, 0.6);

    tl.from(".showcase-text-3", { opacity: 0, y: 100, duration: 0.2 }, 0.7);

    // --- Responsive Resize ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
