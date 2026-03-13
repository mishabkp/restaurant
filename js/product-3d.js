// ===============================================
// FOOD VISTA - PHOTOREALISTIC 3D SHOWCASE (FINAL)
// Uses Three.js & Photographic Textures
// ===============================================

function initProductShowcase() {
    const container = document.getElementById('showcase3DContainer');
    if (!container || typeof THREE === 'undefined' || typeof gsap === 'undefined') return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = ''; 
    container.appendChild(renderer.domElement);

    // --- Texture Loading ---
    const loader = new THREE.TextureLoader();
    const textures = {
        bunTop: loader.load('assets/textures/bun_top.png'),
        patty: loader.load('assets/textures/patty.png'),
        lettuce: loader.load('assets/textures/lettuce.png'),
        bunBottom: loader.load('assets/textures/bun_bottom.png')
    };

    // --- Lighting (Photorealistic Tuning) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    keyLight.position.set(2, 5, 5);
    scene.add(keyLight);

    const goldSpot = new THREE.SpotLight(0xffaa00, 2);
    goldSpot.position.set(-5, 8, 2);
    scene.add(goldSpot);

    // --- Modeling Layers ---
    const layers = [];
    const layerGroup = new THREE.Group();
    scene.add(layerGroup);

    // Helper: Realistic Material
    function foodMat(map, roughness = 0.8) {
        return new THREE.MeshStandardMaterial({ 
            map: map,
            roughness: roughness,
            metalness: 0
        });
    }

    // Geometries
    const bunGeom = (isTop) => {
        const points = [];
        for (let i = 0; i < 11; i++) {
            const rad = isTop ? Math.sin(i * 0.16) * 1.6 : Math.sin(i * 0.1) * 1.55;
            const h = isTop ? Math.cos(i * 0.16) * 0.9 : -Math.cos(i * 0.1) * 0.4;
            points.push(new THREE.Vector2(rad, h));
        }
        return new THREE.LatheGeometry(points, 64);
    };

    // 1. Top Bun
    const topBun = new THREE.Mesh(bunGeom(true), foodMat(textures.bunTop, 0.6));
    topBun.position.y = 1.3;
    layerGroup.add(topBun);
    layers.push({ mesh: topBun, originalY: 1.3 });

    // 2. Lettuce
    const lettuceGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.1, 32);
    const lettuce = new THREE.Mesh(lettuceGeo, foodMat(textures.lettuce, 0.9));
    lettuce.position.y = 0.8;
    lettuce.rotation.z = 0.15;
    layerGroup.add(lettuce);
    layers.push({ mesh: lettuce, originalY: 0.8 });

    // 3. Cheese (Solid color, but with slight gloss)
    const cheeseGeo = new THREE.BoxGeometry(2.3, 0.05, 2.3);
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.2 });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.6;
    cheese.rotation.y = Math.PI / 8;
    layerGroup.add(cheese);
    layers.push({ mesh: cheese, originalY: 0.6 });

    // 4. Meat Patty
    const pattyGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.45, 32);
    const patty = new THREE.Mesh(pattyGeo, foodMat(textures.patty, 1));
    patty.position.y = 0.25;
    layerGroup.add(patty);
    layers.push({ mesh: patty, originalY: 0.25 });

    // 5. Bottom Bun
    const bottomBun = new THREE.Mesh(bunGeom(false), foodMat(textures.bunBottom, 0.7));
    bottomBun.position.y = -0.3;
    layerGroup.add(bottomBun);
    layers.push({ mesh: bottomBun, originalY: -0.3 });

    // --- Atmosphere ---
    const partGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(150 * 3);
    for(let i=0; i<150*3; i++) posArray[i] = (Math.random() - 0.5) * 8;
    partGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const partMat = new THREE.PointsMaterial({ size: 0.03, color: 0xffd700, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // --- Animation ---
    function animate() {
        requestAnimationFrame(animate);
        layerGroup.rotation.y += 0.002;
        particles.rotation.y -= 0.0005;
        renderer.render(scene, camera);
    }
    animate();

    // --- GSAP Scroll ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".showcase-sticky-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
        }
    });

    layers.forEach((layer, i) => {
        const factor = (i - 2) * 2.5; 
        tl.to(layer.mesh.position, { y: layer.originalY + factor, ease: "power2.inOut" }, 0);
        tl.to(layer.mesh.rotation, { x: 0.5, z: 0.1, ease: "power2.inOut" }, 0);
    });

    // Typography Fade (Cleaner Sequence)
    const textSections = document.querySelectorAll('.showcase-text');
    textSections.forEach((text, i) => {
        const start = i * 0.33;
        tl.fromTo(text, 
            { opacity: 0, y: 30, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.2 },
            start
        );
        if(i < textSections.length - 1) {
            tl.to(text, { opacity: 0, scale: 0.9, duration: 0.2 }, start + 0.25);
        }
    });

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
