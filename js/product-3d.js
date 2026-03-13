// ===============================================
// FOOD VISTA - ULTIMATE PHOTOREALISTIC BURGER
// Extreme Detail: Double Patty, Tomato, Onion, Pickles
// ===============================================

// --- Procedural Texture Helpers ---
function createTomatoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Base red
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(0, 0, 256, 256);
    
    // Grained center
    const grad = ctx.createRadialGradient(128, 128, 50, 128, 128, 120);
    grad.addColorStop(0, '#ff4444');
    grad.addColorStop(0.5, '#aa0000');
    grad.addColorStop(1, '#660000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    
    // Seeds
    ctx.fillStyle = '#ffcc00';
    for (let i = 0; i < 40; i++) {
        const ang = Math.random() * Math.PI * 2;
        const rad = 40 + Math.random() * 50;
        ctx.beginPath();
        ctx.ellipse(128 + Math.cos(ang) * rad, 128 + Math.sin(ang) * rad, 3, 5, ang, 0, Math.PI * 2);
        ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
}

function createOnionTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255,255,255,0)'; ctx.fillRect(0,0,256,256);
    
    // Concentric rings
    ctx.lineWidth = 15;
    const colors = ['#f5f5f5', '#e0e0e0', '#d8bfd8'];
    for(let i=0; i<4; i++) {
        ctx.strokeStyle = colors[i % 3];
        ctx.beginPath();
        ctx.arc(128, 128, 110 - i*20, 0, Math.PI*2);
        ctx.stroke();
    }
    return new THREE.CanvasTexture(canvas);
}

function createPickleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4b5320'; ctx.fillRect(0,0,128,128);
    // Bumps
    ctx.fillStyle = '#6b8e23';
    for(let i=0; i<30; i++) {
        ctx.beginPath(); ctx.arc(Math.random()*128, Math.random()*128, 2, 0, Math.PI*2); ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
}

// --- Burger Showcase ---
function initBurgerShowcase() {
    const container = document.getElementById('showcase3DContainer');
    if (!container || typeof THREE === 'undefined' || typeof gsap === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = ''; 
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const textures = {
        bunTop: loader.load('assets/textures/bun_top.png'),
        patty: loader.load('assets/textures/patty.png'),
        lettuce: loader.load('assets/textures/lettuce.png'),
        bunBottom: loader.load('assets/textures/bun_bottom.png'),
        tomato: createTomatoTexture(),
        onion: createOnionTexture(),
        pickle: createPickleTexture()
    };

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const goldLight = new THREE.SpotLight(0xffa500, 3);
    goldLight.position.set(5, 10, 5);
    scene.add(goldLight);

    const layers = [];
    const pickles = [];
    const layerGroup = new THREE.Group();
    scene.add(layerGroup);

    const bunGeom = (isTop) => {
        const points = [];
        for (let i = 0; i < 11; i++) {
            const rad = isTop ? Math.sin(i * 0.16) * 1.6 : Math.sin(i * 0.1) * 1.55;
            const h = isTop ? Math.cos(i * 0.16) * 1.0 : -Math.cos(i * 0.1) * 0.45;
            points.push(new THREE.Vector2(rad, h));
        }
        return new THREE.LatheGeometry(points, 64);
    };

    const addMesh = (geo, mat, y, name) => {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = y;
        layerGroup.add(mesh);
        layers.push({ mesh, originalY: y, name });
        return mesh;
    };

    // Constructing Ultimate Burger
    addMesh(bunGeom(true), new THREE.MeshStandardMaterial({ map: textures.bunTop, roughness: 0.6 }), 2.2, "Top Bun");
    
    // Pickles (Floating outside)
    for(let i=0; i<6; i++) {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16), new THREE.MeshStandardMaterial({ map: textures.pickle }));
        const ang = (i / 6) * Math.PI * 2;
        p.position.set(Math.cos(ang) * 2.5, 1.8 + Math.random(), Math.sin(ang) * 2.5);
        p.rotation.set(Math.random(), Math.random(), Math.random());
        layerGroup.add(p);
        pickles.push({ mesh: p, orbit: ang, speed: 0.01 + Math.random()*0.02, phase: Math.random()*10 });
    }

    addMesh(new THREE.CylinderGeometry(1.5, 1.5, 0.05, 32), new THREE.MeshStandardMaterial({ map: textures.tomato }), 1.6, "Tomato 1");
    addMesh(new THREE.CylinderGeometry(1.6, 1.6, 0.05, 32), new THREE.MeshStandardMaterial({ map: textures.onion, transparent: true }), 1.4, "Onion");
    
    // Lettuce (Leafy Geometry)
    const lettuce = addMesh(new THREE.TorusGeometry(1.4, 0.3, 16, 100), new THREE.MeshStandardMaterial({ map: textures.lettuce, roughness: 0.8 }), 1.1, "Lettuce Top");
    lettuce.scale.y = 0.3;

    addMesh(new THREE.CylinderGeometry(1.5, 1.5, 0.45, 32), new THREE.MeshStandardMaterial({ map: textures.patty, roughness: 1 }), 0.7, "Patty 1");
    addMesh(new THREE.BoxGeometry(2.4, 0.05, 2.4), new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.3 }), 0.4, "Cheese 1");
    
    addMesh(new THREE.CylinderGeometry(1.55, 1.55, 0.45, 32), new THREE.MeshStandardMaterial({ map: textures.patty, roughness: 1 }), 0.0, "Patty 2");
    addMesh(new THREE.BoxGeometry(2.4, 0.05, 2.4), new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.3 }), -0.3, "Cheese 2");
    
    addMesh(new THREE.TorusGeometry(1.4, 0.2, 16, 100), new THREE.MeshStandardMaterial({ map: textures.lettuce }), -0.6, "Lettuce Bottom");
    addMesh(bunGeom(false), new THREE.MeshStandardMaterial({ map: textures.bunBottom }), -1.0, "Bottom Bun");

    function animate() {
        requestAnimationFrame(animate);
        layerGroup.rotation.y += 0.002;
        pickles.forEach(p => {
            p.mesh.position.y += Math.sin(Date.now()*0.002 + p.phase) * 0.005;
            p.mesh.rotation.x += 0.01;
            p.mesh.rotation.z += 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".showcase-section-burger",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
        }
    });

    layers.forEach((layer, i) => {
        const factor = (layers.length / 2 - i) * 2.8;
        tl.to(layer.mesh.position, { y: layer.originalY + factor, ease: "power2.inOut" }, 0);
        tl.to(layer.mesh.rotation, { x: 0.4, z: i%2===0 ? 0.2 : -0.2, ease: "power2.inOut" }, 0);
    });
    
    // Pickles explode wider
    pickles.forEach((p, i) => {
        tl.to(p.mesh.position, { 
            x: p.mesh.position.x * 2.5, 
            z: p.mesh.position.z * 2.5, 
            y: p.mesh.position.y + (i-3)*4,
            ease: "power2.inOut" 
        }, 0);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- Sadya Showcase (Kept for continuity) ---
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

    const leafGeo = new THREE.PlaneGeometry(6, 4);
    const leafMat = new THREE.MeshStandardMaterial({ map: textures.leaf, transparent: true, side: THREE.DoubleSide });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.rotation.x = -Math.PI / 2.2;
    layerGroup.add(leaf);
    layers.push({ mesh: leaf, originalY: 0, isBase: true });

    const riceGeo = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const riceMat = new THREE.MeshStandardMaterial({ map: textures.rice });
    const rice = new THREE.Mesh(riceGeo, riceMat);
    rice.position.set(0, 0.1, 0.5);
    rice.scale.y = 0.6;
    layerGroup.add(rice);
    layers.push({ mesh: rice, originalY: 0.1, originalX: 0, originalZ: 0.5 });

    const createBowl = (color, x, z, y=0.1) => {
        const bowlGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.3, 32);
        const bowlMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3 });
        const bowl = new THREE.Mesh(bowlGeo, bowlMat);
        bowl.position.set(x, y, z);
        layerGroup.add(bowl);
        layers.push({ mesh: bowl, originalY: y, originalX: x, originalZ: z });
    };

    createBowl(0xdaa520, -1.5, -0.5); 
    createBowl(0xffd700, -2.2, 0.2);  
    createBowl(0xff4500, 1.5, -0.8);  

    const papGeo = new THREE.CircleGeometry(0.5, 32);
    const pappadam = new THREE.Mesh(papGeo, new THREE.MeshStandardMaterial({ color: 0xffe4b5, side: THREE.DoubleSide }));
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
        const jump = (i + 1) * 1.5;
        tl.to(layer.mesh.position, { 
            y: layer.originalY + jump, 
            x: layer.originalX * 1.3,
            z: layer.originalZ * 1.6,
            ease: "power2.out" 
        }, 0);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
