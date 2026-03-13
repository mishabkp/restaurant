// ===============================================
// FOOD VISTA - MULTI-PRODUCT 3D SHOWCASE
// Burger & Photorealistic Sadya
// ===============================================

// --- Burger Showcase ---
function initBurgerShowcase() {
    const container = document.getElementById('showcase3DContainer');
    if (!container || typeof THREE === 'undefined' || typeof gsap === 'undefined') return;

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

    const loader = new THREE.TextureLoader();
    const textures = {
        bunTop: loader.load('assets/textures/bun_top.png'),
        patty: loader.load('assets/textures/patty.png'),
        lettuce: loader.load('assets/textures/lettuce.png'),
        bunBottom: loader.load('assets/textures/bun_bottom.png')
    };

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    keyLight.position.set(2, 5, 5);
    scene.add(keyLight);

    const layers = [];
    const layerGroup = new THREE.Group();
    scene.add(layerGroup);

    function foodMat(map, roughness = 0.8) {
        return new THREE.MeshStandardMaterial({ map, roughness, metalness: 0 });
    }

    const bunGeom = (isTop) => {
        const points = [];
        for (let i = 0; i < 11; i++) {
            const rad = isTop ? Math.sin(i * 0.16) * 1.6 : Math.sin(i * 0.1) * 1.55;
            const h = isTop ? Math.cos(i * 0.16) * 0.9 : -Math.cos(i * 0.1) * 0.4;
            points.push(new THREE.Vector2(rad, h));
        }
        return new THREE.LatheGeometry(points, 64);
    };

    const topBun = new THREE.Mesh(bunGeom(true), foodMat(textures.bunTop, 0.6));
    topBun.position.y = 1.3;
    layerGroup.add(topBun);
    layers.push({ mesh: topBun, originalY: 1.3 });

    const lettuceGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.1, 32);
    const lettuce = new THREE.Mesh(lettuceGeo, foodMat(textures.lettuce, 0.9));
    lettuce.position.y = 0.8;
    layerGroup.add(lettuce);
    layers.push({ mesh: lettuce, originalY: 0.8 });

    const cheeseGeo = new THREE.BoxGeometry(2.3, 0.05, 2.3);
    const cheese = new THREE.Mesh(cheeseGeo, new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.2 }));
    cheese.position.y = 0.6;
    layerGroup.add(cheese);
    layers.push({ mesh: cheese, originalY: 0.6 });

    const pattyGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.45, 32);
    const patty = new THREE.Mesh(pattyGeo, foodMat(textures.patty, 1));
    patty.position.y = 0.25;
    layerGroup.add(patty);
    layers.push({ mesh: patty, originalY: 0.25 });

    const bottomBun = new THREE.Mesh(bunGeom(false), foodMat(textures.bunBottom, 0.7));
    bottomBun.position.y = -0.3;
    layerGroup.add(bottomBun);
    layers.push({ mesh: bottomBun, originalY: -0.3 });

    function animate() {
        requestAnimationFrame(animate);
        layerGroup.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".showcase-section-burger",
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

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- Sadya Showcase ---
function initSadyaShowcase() {
    const container = document.getElementById('sadya3DContainer');
    if (!container || typeof THREE === 'undefined' || typeof gsap === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const textures = {
        leaf: loader.load('assets/textures/banana_leaf.png'),
        rice: loader.load('assets/textures/rice.png')
    };

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(5, 10, 5);
    scene.add(sun);

    const layers = [];
    const layerGroup = new THREE.Group();
    scene.add(layerGroup);

    // 1. Banana Leaf (Base)
    const leafGeo = new THREE.PlaneGeometry(6, 4);
    const leafMat = new THREE.MeshStandardMaterial({ map: textures.leaf, transparent: true, side: THREE.DoubleSide });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.rotation.x = -Math.PI / 2.2;
    layerGroup.add(leaf);
    layers.push({ mesh: leaf, originalY: 0, isBase: true });

    // 2. Rice Heap
    const riceGeo = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const riceMat = new THREE.MeshStandardMaterial({ map: textures.rice });
    const rice = new THREE.Mesh(riceGeo, riceMat);
    rice.position.set(0, 0.1, 0.5);
    rice.scale.y = 0.6;
    layerGroup.add(rice);
    layers.push({ mesh: rice, originalY: 0.1, originalX: 0, originalZ: 0.5 });

    // 3. Sambar / Parippu (Stylized bowls)
    const createBowl = (color, x, z, y=0.1) => {
        const bowlGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.3, 32);
        const bowlMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3 });
        const bowl = new THREE.Mesh(bowlGeo, bowlMat);
        bowl.position.set(x, y, z);
        layerGroup.add(bowl);
        layers.push({ mesh: bowl, originalY: y, originalX: x, originalZ: z });
    };

    createBowl(0xdaa520, -1.5, -0.5); // Sambar
    createBowl(0xffd700, -2.2, 0.2);  // Parippu
    createBowl(0xff4500, 1.5, -0.8);  // Aviyal (Orange-ish)

    // 4. Pappadam
    const papGeo = new THREE.CircleGeometry(0.5, 32);
    const papMat = new THREE.MeshStandardMaterial({ color: 0xffe4b5, side: THREE.DoubleSide });
    const pappadam = new THREE.Mesh(papGeo, papMat);
    pappadam.rotation.x = -Math.PI / 2;
    pappadam.position.set(2, 0.1, 1);
    layerGroup.add(pappadam);
    layers.push({ mesh: pappadam, originalY: 0.1, originalX: 2, originalZ: 1 });

    function animate() {
        requestAnimationFrame(animate);
        layerGroup.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".showcase-section-sadya",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
        }
    });

    layers.forEach((layer, i) => {
        if (layer.isBase) return;
        const jump = (i + 1) * 1.2;
        tl.to(layer.mesh.position, { 
            y: layer.originalY + jump, 
            x: layer.originalX * 1.2,
            z: layer.originalZ * 1.5,
            ease: "power2.out" 
        }, 0);
        
        tl.to(layer.mesh.rotation, {
            y: Math.PI * 0.5,
            x: Math.PI * 0.1,
            ease: "power2.out"
        }, 0);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
