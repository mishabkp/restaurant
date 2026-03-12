// ========================================
// FOOD VISTA — 3D HERO ANIMATION
// Three.js particle sphere with floating food elements
// ========================================

function init3DHeroScene() {
  const canvas = document.getElementById('hero3D');
  if (!canvas || typeof THREE === 'undefined') return;

  // ─── Renderer ─────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // ─── Camera ───────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 5.5);

  // ─── Scene ────────────────────────────────────────────────
  const scene = new THREE.Scene();

  // ─── Lights ───────────────────────────────────────────────
  const ambient = new THREE.AmbientLight(0xffd580, 0.6);
  scene.add(ambient);

  const pointLight = new THREE.PointLight(0xff9900, 4, 15);
  pointLight.position.set(3, 3, 3);
  scene.add(pointLight);

  const rimLight = new THREE.PointLight(0xff6640, 2, 12);
  rimLight.position.set(-3, -2, 2);
  scene.add(rimLight);

  // ─── Particle Sphere ──────────────────────────────────────
  const PARTICLE_COUNT = 1800;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors    = new Float32Array(PARTICLE_COUNT * 3);
  const sizes     = new Float32Array(PARTICLE_COUNT);

  const colorPalette = [
    new THREE.Color(0xffd166), // golden yellow
    new THREE.Color(0xff9f1c), // amber
    new THREE.Color(0xef476f), // coral red
    new THREE.Color(0x06d6a0), // teal accent
    new THREE.Color(0xffffff), // white sparkle
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Fibonacci sphere distribution for even spread
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = ((1 + Math.sqrt(5)) / 2) * i * Math.PI * 2;
    const R = 2.0 + (Math.random() - 0.5) * 0.3; // slight noise

    positions[i * 3]     = Math.cos(theta) * radius * R;
    positions[i * 3 + 1] = y * R;
    positions[i * 3 + 2] = Math.sin(theta) * radius * R;

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 4 + 1.5;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Soft glowing circular point texture
  const particleCanvas = document.createElement('canvas');
  particleCanvas.width = particleCanvas.height = 64;
  const pCtx = particleCanvas.getContext('2d');
  const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(255,200,80,0.8)');
  grad.addColorStop(1, 'rgba(255,150,0,0)');
  pCtx.fillStyle = grad;
  pCtx.fillRect(0, 0, 64, 64);
  const particleTex = new THREE.CanvasTexture(particleCanvas);

  const particleMat = new THREE.PointsMaterial({
    size: 0.055,
    map: particleTex,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particleMesh = new THREE.Points(particleGeo, particleMat);
  scene.add(particleMesh);

  // ─── Inner Glowing Core Sphere ────────────────────────────
  const coreSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0xff9900,
      emissive: 0xff6600,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.85,
    })
  );
  scene.add(coreSphere);

  // ─── Orbiting Ring ────────────────────────────────────────
  const ringGeo = new THREE.TorusGeometry(2.4, 0.012, 8, 160);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xffd166,
    transparent: true,
    opacity: 0.35,
  });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI / 4;
  scene.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.008, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0xff9f1c, transparent: true, opacity: 0.2 })
  );
  ring2.rotation.x = -Math.PI / 3;
  ring2.rotation.z = Math.PI / 5;
  scene.add(ring2);

  // ─── Floating Food Sprites (emoji-based) ──────────────────
  const foodEmojis = ['🍛', '🥘', '🦞', '🌶️', '🥥', '🍜', '🫙', '🍤', '🥗', '🍚'];
  const sprites = [];

  function makeEmojiTexture(emoji) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const cx = c.getContext('2d');
    cx.font = '80px serif';
    cx.textAlign = 'center';
    cx.textBaseline = 'middle';
    cx.fillText(emoji, 64, 72);
    return new THREE.CanvasTexture(c);
  }

  foodEmojis.forEach((emoji, i) => {
    const tex = makeEmojiTexture(emoji);
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);

    const angle = (i / foodEmojis.length) * Math.PI * 2;
    const orbitR = 3.2 + (i % 2) * 0.4;
    const tiltY  = (Math.random() - 0.5) * 1.2;
    sprite.position.set(Math.cos(angle) * orbitR, tiltY, Math.sin(angle) * orbitR);
    sprite.scale.set(0.45, 0.45, 1);

    sprite.userData = {
      orbitRadius: orbitR,
      orbitSpeed:  0.003 + Math.random() * 0.002,
      orbitAngle:  angle,
      tiltY,
      bobOffset:   Math.random() * Math.PI * 2,
    };

    scene.add(sprite);
    sprites.push(sprite);
  });

  // ─── Mouse Parallax ───────────────────────────────────────
  let targetX = 0, targetY = 0;
  let mouseX = 0, mouseY = 0;

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
  }
  window.addEventListener('mousemove', onMouseMove);

  // ─── Animation Loop ───────────────────────────────────────
  let frameId;
  const clock = new THREE.Clock();

  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth parallax camera drift
    targetX += (mouseX * 0.4 - targetX) * 0.04;
    targetY += (-mouseY * 0.3 - targetY) * 0.04;
    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.lookAt(0, 0, 0);

    // Rotate particle sphere
    particleMesh.rotation.y = t * 0.12;
    particleMesh.rotation.x = t * 0.05;

    // Pulse core
    const pulse = 1 + Math.sin(t * 2.5) * 0.06;
    coreSphere.scale.setScalar(pulse);
    coreSphere.material.emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.3;

    // Rotate rings
    ring1.rotation.z = t * 0.18;
    ring2.rotation.y = t * 0.12;

    // Roving point light
    pointLight.position.x = Math.sin(t * 0.7) * 4;
    pointLight.position.y = Math.cos(t * 0.5) * 3;

    // Orbit food sprites
    sprites.forEach((sprite, i) => {
      const ud = sprite.userData;
      ud.orbitAngle += ud.orbitSpeed;
      sprite.position.x = Math.cos(ud.orbitAngle) * ud.orbitRadius;
      sprite.position.z = Math.sin(ud.orbitAngle) * ud.orbitRadius;
      // Gentle vertical bob
      sprite.position.y = ud.tiltY + Math.sin(t * 1.2 + ud.bobOffset) * 0.18;
      // Slightly face camera always (sprites are billboarded by default)
      sprite.material.opacity = 0.7 + Math.sin(t * 0.8 + i) * 0.2;
    });

    renderer.render(scene, camera);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();

  // ─── Cleanup when navigating away ─────────────────────────
  // Store cleanup fn on canvas so app.js can call it
  canvas._cleanup3D = () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}
