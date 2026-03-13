// ========================================
// FOOD VISTA - PREMIUM 3D SHOWCASE (REFINED)
// Uses Three.js & GSAP ScrollTrigger
// ========================================

function initProductShowcase() {
    const container = document.getElementById('showcase3DContainer');
    if (!container || typeof THREE === 'undefined' || typeof gsap === 'undefined') return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = ''; // Clear previous
    container.appendChild(renderer.domElement);

    // --- Lighting (Cinematic Overhaul) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xffaa44, 1.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.5);
    fillLight.position.set(-5, 0, 2);
    scene.add(fillLight);

    // Intense Gold Rim Light
    const rimLight = new THREE.SpotLight(0xffd700, 4);
    rimLight.position.set(0, 8, -5);
    rimLight.angle = Math.PI / 4;
    rimLight.penumbra = 0.3;
    scene.add(rimLight);

    // --- Modeling Helpers ---
    function createRoundedBun(top = true) {
        const points = [];
        for (let i = 0; i < 10; i++) {
            const x = Math.sin(i * 0.2) * 1.5;
            const y = top ? Math.cos(i * 0.2) * 0.8 : -Math.cos(i * 0.2) * 0.5;
            points.push(new THREE.Vector2(x, y));
        }
        const geometry = new THREE.LatheGeometry(points, 32);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xcd853f, 
            roughness: 0.7, 
            metalness: 0.1,
            bumpScale: 0.02
        });
        return new THREE.Mesh(geometry, material);
    }

    // --- Layers Construction ---
    const layers = [];
    const layerGroup = new THREE.Group();
    scene.add(layerGroup);

    // 1. Top Bun with Sesame Seeds
    const topBun = createRoundedBun(true);
    topBun.position.y = 1.2;
    topBun.name = "Top Bun";
    layerGroup.add(topBun);
    layers.push({ mesh: topBun, originalY: 1.2, delay: 0 });

    // Sesame Seeds system
    const seedGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const seedMat = new THREE.MeshStandardMaterial({ color: 0xfffdd0 });
    for(let i=0; i<60; i++) {
        const seed = new THREE.Mesh(seedGeo, seedMat);
        const phi = Math.acos(-1 + (2 * i) / 60);
        const theta = Math.sqrt(60 * Math.PI) * phi;
        seed.position.setFromSphericalCoords(1.45, phi * 0.5, theta);
        seed.position.y += 0.1;
        topBun.add(seed);
    }

    // 2. Lettuce (Custom shape)
    const lettuceGeo = new THREE.TorusGeometry(1.2, 0.15, 16, 100);
    const lettuceMat = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.8 });
    const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
    lettuce.rotation.x = Math.PI / 2;
    lettuce.position.y = 0.7;
    layerGroup.add(lettuce);
    layers.push({ mesh: lettuce, originalY: 0.7, delay: 0.1 });

    // 3. Cheese
    const cheeseGeo = new THREE.BoxGeometry(2.2, 0.1, 2.2);
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.3 });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.5;
    cheese.rotation.y = Math.PI / 4;
    layerGroup.add(cheese);
    layers.push({ mesh: cheese, originalY: 0.5, delay: 0.2 });

    // 4. Juicy Patty
    const pattyGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.4, 32);
    const pattyMat = new THREE.MeshStandardMaterial({ color: 0x3d1c02, roughness: 0.9, metalness: 0 });
    const patty = new THREE.Mesh(pattyGeo, pattyMat);
    patty.position.y = 0.2;
    layerGroup.add(patty);
    layers.push({ mesh: patty, originalY: 0.2, delay: 0.3 });

    // 5. Bottom Bun
    const bottomBun = createRoundedBun(false);
    bottomBun.position.y = -0.3;
    layerGroup.add(bottomBun);
    layers.push({ mesh: bottomBun, originalY: -0.3, delay: 0.4 });

    // --- Atmospheric Particles ---
    const partGeo = new THREE.BufferGeometry();
    const partCount = 200;
    const posArray = new Float32Array(partCount * 3);
    for(let i=0; i<partCount*3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const partMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffd700,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);
        layerGroup.rotation.y += 0.003;
        particles.rotation.y += 0.001;
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
            scrub: 1.5,
        }
    });

    // Explode layers with stagger and rotation
    layers.forEach((layer, i) => {
        const factor = (i - 2) * 2.2;
        tl.to(layer.mesh.position, {
            y: layer.originalY + factor,
            ease: "power3.inOut"
        }, 0);
        
        tl.to(layer.mesh.rotation, {
            x: Math.PI * 0.15,
            z: Math.PI * 0.05,
            ease: "power3.inOut"
        }, 0);
    });

    // Camera move on scroll
    tl.to(camera.position, { z: 8, ease: "none" }, 0);
    
    // UI Text Animations (Redesigned for premium flow)
    const textSections = document.querySelectorAll('.showcase-text');
    textSections.forEach((text, i) => {
        const start = i * 0.3;
        tl.fromTo(text, 
            { opacity: 0, y: 50, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.2 },
            start
        );
        if(i < textSections.length - 1) {
            tl.to(text, { opacity: 0, y: -50, filter: 'blur(10px)', duration: 0.2 }, start + 0.25);
        }
    });

    // --- Responsive Resize ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
