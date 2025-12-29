"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";

import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Undo,
  Redo,
  RefreshCw,
  FlipHorizontal,
  FlipVertical,
} from "lucide-react";

import { useSearchParams } from "next/navigation";


export default function Home() {

  const searchParams = useSearchParams();

  const pngUrl = searchParams.get("img");

  const [jpgUrl, setJpgUrl] =  useState<string | null>(null) ;

  const [bodyType, setBodyType] = useState("/gltf/boy.glb")

  const mountRef = useRef<HTMLDivElement>(null);
  const [tattooSize, setTattooSize] = useState(0.3);
  const currentDecalRef = useRef<THREE.Mesh | null>(null);
  const controlsRef = useRef<any>(null);
  const historyRef = useRef<Array<{
    mesh: THREE.Mesh;
    point: THREE.Vector3;
    normal: THREE.Vector3;
    orientation: THREE.Euler;
    localRotation: THREE.Euler;
    localScale: number;
  }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const tattooDataRef = useRef<{
    mesh: THREE.Mesh;
    point: THREE.Vector3;
    normal: THREE.Vector3;
    orientation: THREE.Euler;
    localRotation: THREE.Euler;
    localScale: number;
  } | null>(null);

  useEffect(() => {
    if (!pngUrl) return;
  
    setJpgUrl(
      pngUrl.replace("/upload/", "/upload/f_jpg/")
    );
  }, [pngUrl]);

  useEffect(() => {
    if (!mountRef.current || !jpgUrl) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.target.set(0, 0.8, 0); // Center on model's torso
    controlsRef.current = controls;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    const loader = new GLTFLoader();
    let model: THREE.Object3D;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    
 

    // Load tattoo texture
    const tattooTexture = new THREE.TextureLoader().load(jpgUrl);
    tattooTexture.flipY = false;
    // @ts-ignore
    loader.load(bodyType, (gltf) => {
      model = gltf.scene;
      
      // Center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      model.position.y = -box.min.y  - 0.5; // Place feet at ground level
      
      scene.add(model);
      modelRef.current = model;
    });

    // Click to place tattoo
    function onMouseClick(event: MouseEvent) {
      if (!model) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(model, true);

      if (intersects.length > 0) {
        const intersect = intersects[0];
        
        // Remove previous decal if exists
        if (currentDecalRef.current) {
          scene.remove(currentDecalRef.current);
          currentDecalRef.current.geometry.dispose();
          if (Array.isArray(currentDecalRef.current.material)) {
            currentDecalRef.current.material.forEach(m => m.dispose());
          } else {
            currentDecalRef.current.material.dispose();
          }
        }
        
        // Get the surface normal and point
        const point = intersect.point;
        const normal = intersect.face!.normal.clone();
        
        // Transform normal to world space
        const mesh = intersect.object as THREE.Mesh;
        normal.transformDirection(mesh.matrixWorld);

        // Create orientation for the decal
        const orientation = new THREE.Euler();
        
        // Create a helper to orient the decal
        const helper = new THREE.Object3D();
        helper.position.copy(point);
        helper.lookAt(point.clone().add(normal));
        orientation.copy(helper.rotation);

        const decalMaterial = new THREE.ShaderMaterial({
          uniforms: {
            map: { value: tattooTexture },
          },
          transparent: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -4,
          side: THREE.FrontSide,
        
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
        
          fragmentShader: `
            uniform sampler2D map;
            varying vec2 vUv;
        
            void main() {
              vec4 tattoo = texture2D(map, vUv);
              float alpha = 1.0 - tattoo.r;
              vec3 ink = vec3(0.0);
              gl_FragColor = vec4(ink, alpha);
            }
          `,
        });
        
        const size = new THREE.Vector3(tattooSize, tattooSize, 0.15);

        const decalGeometry = new DecalGeometry(
          mesh,
          point,
          orientation,
          size
        );

        const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
        scene.add(decalMesh);
        currentDecalRef.current = decalMesh;
        
        // Store tattoo data for 3D manipulation
        tattooDataRef.current = {
          mesh: mesh,
          point: point.clone(),
          normal: normal.clone(),
          orientation: orientation.clone(),
          localRotation: new THREE.Euler(0, 0, 0),
          localScale: 1
        };
        
        // Save initial state to history
        historyRef.current = [{
          mesh: mesh,
          point: point.clone(),
          normal: normal.clone(),
          orientation: orientation.clone(),
          localRotation: new THREE.Euler(0, 0, 0),
          localScale: 1
        }];
        setHistoryIndex(0);
        setCanUndo(false);
        setCanRedo(false);
      
      }
    }

    window.addEventListener("click", onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onMouseClick);
      if (currentDecalRef.current) {
        scene.remove(currentDecalRef.current);
      }
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [bodyType, jpgUrl]);

  // Recreate decal with new parameters
  const recreateDecal = () => {
    if (!tattooDataRef.current || !sceneRef.current || !jpgUrl) return;

    const { mesh, point, normal, orientation, localRotation, localScale } = tattooDataRef.current;

    // Remove old decal
    if (currentDecalRef.current && sceneRef.current) {
      sceneRef.current.remove(currentDecalRef.current);
      currentDecalRef.current.geometry.dispose();
      if (Array.isArray(currentDecalRef.current.material)) {
        currentDecalRef.current.material.forEach(m => m.dispose());
      } else {
        currentDecalRef.current.material.dispose();
      }
    }

    // Load tattoo texture
    const tattooTexture = new THREE.TextureLoader().load(jpgUrl);
    tattooTexture.flipY = false;

    const decalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: tattooTexture },
      },
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      side: THREE.FrontSide,
    
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
    
      fragmentShader: `
        uniform sampler2D map;
        varying vec2 vUv;
    
        void main() {
          vec4 tattoo = texture2D(map, vUv);
          float alpha = 1.0 - tattoo.r;
          vec3 ink = vec3(0.0);
          gl_FragColor = vec4(ink, alpha);
        }
      `,
    });

    // Apply local rotation to the orientation
    const finalOrientation = new THREE.Euler(
      orientation.x + localRotation.x,
      orientation.y + localRotation.y,
      orientation.z + localRotation.z,
      orientation.order
    );

    const size = new THREE.Vector3(
      tattooSize * localScale, 
      tattooSize * localScale, 
      0.15
    );

    const decalGeometry = new (DecalGeometry as any)(
      mesh,
      point,
      finalOrientation,
      size
    );

    const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
    sceneRef.current.add(decalMesh);
    currentDecalRef.current = decalMesh;

    if (rendererRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  // Save state to history
  const saveToHistory = () => {
    if (!tattooDataRef.current) return;
    
    // Remove any future states if we're not at the end
    const newHistory = historyRef.current.slice(0, historyIndex + 1);
    
    // Add current state
    newHistory.push({
      mesh: tattooDataRef.current.mesh,
      point: tattooDataRef.current.point.clone(),
      normal: tattooDataRef.current.normal.clone(),
      orientation: tattooDataRef.current.orientation.clone(),
      localRotation: tattooDataRef.current.localRotation.clone(),
      localScale: tattooDataRef.current.localScale
    });
    
    // Keep history limited to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    historyRef.current = newHistory;
    const newIndex = newHistory.length - 1;
    setHistoryIndex(newIndex);
    setCanUndo(newIndex > 0);
    setCanRedo(false);
  };

  // Undo function
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = historyRef.current[newIndex];
      
      tattooDataRef.current = {
        mesh: state.mesh,
        point: state.point.clone(),
        normal: state.normal.clone(),
        orientation: state.orientation.clone(),
        localRotation: state.localRotation.clone(),
        localScale: state.localScale
      };
      
      setHistoryIndex(newIndex);
      setCanUndo(newIndex > 0);
      setCanRedo(true);
      recreateDecal();
    }
  };

  // Redo function
  const redo = () => {
    if (historyIndex < historyRef.current.length - 1) {
      const newIndex = historyIndex + 1;
      const state = historyRef.current[newIndex];
      
      tattooDataRef.current = {
        mesh: state.mesh,
        point: state.point.clone(),
        normal: state.normal.clone(),
        orientation: state.orientation.clone(),
        localRotation: state.localRotation.clone(),
        localScale: state.localScale
      };
      
      setHistoryIndex(newIndex);
      setCanUndo(true);
      setCanRedo(newIndex < historyRef.current.length - 1);
      recreateDecal();
    }
  };

  // UI Control Functions - Move along surface
  const moveTattoo = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!tattooDataRef.current || !modelRef.current || !sceneRef.current) return;
    
    const moveAmount = 0.03;
    const raycaster = new THREE.Raycaster();
    
    // Calculate movement direction based on current orientation
    const { normal, point } = tattooDataRef.current;
    
    // Create a local coordinate system on the surface
    const tangent = new THREE.Vector3();
    const bitangent = new THREE.Vector3();
    
    // Find a perpendicular vector to the normal
    if (Math.abs(normal.y) < 0.9) {
      tangent.set(0, 1, 0);
    } else {
      tangent.set(1, 0, 0);
    }
    
    tangent.cross(normal).normalize();
    bitangent.crossVectors(normal, tangent).normalize();
    
    // Calculate new position based on direction
    const newPoint = point.clone();
    
    switch(direction) {
      case 'up':
        newPoint.add(bitangent.multiplyScalar(moveAmount));
        break;
      case 'down':
        newPoint.add(bitangent.multiplyScalar(-moveAmount));
        break;
      case 'left':
        newPoint.add(tangent.multiplyScalar(-moveAmount));
        break;
      case 'right':
        newPoint.add(tangent.multiplyScalar(moveAmount));
        break;
    }
    
    // Raycast to find new surface point
    const rayDirection = normal.clone().multiplyScalar(-1);
    raycaster.set(newPoint.clone().add(normal.clone().multiplyScalar(0.1)), rayDirection);
    
    const intersects = raycaster.intersectObject(modelRef.current, true);
    
    if (intersects.length > 0) {
      const newIntersect = intersects[0];
      tattooDataRef.current.point = newIntersect.point.clone();
      
      // Update normal
      const newNormal = newIntersect.face!.normal.clone();
      const mesh = newIntersect.object as THREE.Mesh;
      newNormal.transformDirection(mesh.matrixWorld);
      tattooDataRef.current.normal = newNormal;
      
      // Update orientation
      const helper = new THREE.Object3D();
      helper.position.copy(newIntersect.point);
      helper.lookAt(newIntersect.point.clone().add(newNormal));
      tattooDataRef.current.orientation.copy(helper.rotation);
      
      saveToHistory();
      recreateDecal();
    }
  };

  const rotateTattoo = (axis: 'x' | 'y' | 'z', direction: number) => {
    if (!tattooDataRef.current) return;
    const rotateAmount = 0.2;
    tattooDataRef.current.localRotation[axis] += direction * rotateAmount;
    saveToHistory();
    recreateDecal();
  };

  const flipTattoo = (axis: 'horizontal' | 'vertical') => {
    if (!tattooDataRef.current) return;
    if (axis === 'horizontal') {
      tattooDataRef.current.localRotation.y += Math.PI;
    } else {
      tattooDataRef.current.localRotation.x += Math.PI;
    }
    saveToHistory();
    recreateDecal();
  };

  const scaleTattoo = (direction: number) => {
    if (!tattooDataRef.current) return;
    const scaleAmount = 0.1;
    const newScale = tattooDataRef.current.localScale + direction * scaleAmount;
    if (newScale > 0.2 && newScale < 3) {
      tattooDataRef.current.localScale = newScale;
      saveToHistory();
      recreateDecal();
    }
  };



  const rotateCamera = (direction: 'left' | 'right') => {
    if (!controlsRef.current || !cameraRef.current) return;
    const angle = direction === 'left' ? 0.3 : -0.3;
    const cam = cameraRef.current;
    const target = controlsRef.current.target;
    
    const offset = new THREE.Vector3().subVectors(cam.position, target);
    const radius = offset.length();
    const theta = Math.atan2(offset.x, offset.z) + angle;
    
    cam.position.x = target.x + radius * Math.sin(theta);
    cam.position.z = target.z + radius * Math.cos(theta);
    controlsRef.current.update();
  };

  const moveModel = (direction: 'up' | 'down') => {
    if (!controlsRef.current || !cameraRef.current) return;
    const moveAmount = direction === 'down' ? 0.2 : -0.2;
    cameraRef.current.position.y += moveAmount;
    controlsRef.current.target.y += moveAmount;
    controlsRef.current.update();
  };

  const zoomCamera = (direction: 'in' | 'out') => {
    if (!controlsRef.current || !cameraRef.current) return;
    const cam = cameraRef.current;
    const target = controlsRef.current.target;
    const offset = new THREE.Vector3().subVectors(cam.position, target);
    const distance = offset.length();
    const newDistance = direction === 'in' ? distance * 0.9 : distance * 1.1;
    
    if (newDistance >= 1 && newDistance <= 10) {
      offset.normalize().multiplyScalar(newDistance);
      cam.position.copy(target).add(offset);
      controlsRef.current.update();
    }
  };


  return (
    <div className="relative w-full h-screen bg-neutral-100 text-black">
  
      <div ref={mountRef} className="w-full h-full" />
  
      {/* Camera Controls - Left Side */}
      <div className="absolute top-0 left-0 h-full w-80 bg-white border border-neutral-300 shadow-lg p-6 flex flex-col overflow-auto">
        <div className="text-center mb-6">
          <h3 className="font-bold text-2xl text-black mb-1">Model View</h3>
          <p className="text-sm text-neutral-500">Control your viewing angle</p>
        </div>
  
        {/* Change Model */}
        <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm mb-5">
          <div className="flex items-center justify-center gap-2 mb-4">
           
            <h4 className="font-bold text-base text-black">Change Model</h4>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setBodyType("/gltf/boy.glb")} className="flex-1 py-4 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-md">
              Boy
            </button>
            <button onClick={() => setBodyType("/gltf/girl.glb")} className="flex-1 py-4 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-md">
              Girl
            </button>
          </div>
        </div>
  
        <div className="flex flex-col gap-6">
  
          {/* ROTATE Controls */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
             
              <h4 className="font-bold text-base text-black">Rotate Around</h4>
            </div>
            <div className="flex gap-3">
              <button onClick={() => rotateCamera('left')} className="flex-1 py-4 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-md">
                <ArrowLeft className="w-6 h-6 mx-auto"/>
              </button>
              <button onClick={() => rotateCamera('right')} className="flex-1 py-4 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-md">
                <ArrowRight className="w-6 h-6 mx-auto"/>
              </button>
            </div>
          </div>
  
          {/* MOVE Controls */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
             
              <h4 className="font-bold text-base text-black">Move Model</h4>
            </div>
            <div className="flex gap-3">
              <button onClick={() => moveModel('up')} className="flex-1 py-4 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-md">
                <ArrowUp className="w-6 h-6 mx-auto"/>
              </button>
              <button onClick={() => moveModel('down')} className="flex-1 py-4 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-md">
                <ArrowDown className="w-6 h-6 mx-auto"/>
              </button>
            </div>
          </div>
  
          {/* ZOOM Controls */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
            
              <h4 className="font-bold text-base text-black">Zoom</h4>
            </div>
            <div className="flex gap-3">
              <button onClick={() => zoomCamera('in')} className="flex-1 py-4 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-md">
                <ZoomIn className="w-6 h-6 mx-auto"/>
              </button>
              <button onClick={() => zoomCamera('out')} className="flex-1 py-4 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl font-bold text-lg transition-all shadow-md">
                <ZoomOut className="w-6 h-6 mx-auto"/>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Real-time Editing UI - Right Side */}
      <div className="absolute top-0 right-0 h-full w-80 bg-white border border-neutral-300 shadow-lg p-6 flex flex-col overflow-y-auto">
        <div className="text-center mb-6">
          <h3 className="font-bold text-2xl text-black mb-1">Edit Your Tattoo</h3>
          <p className="text-sm text-neutral-500">Use the controls below to adjust position, size, and orientation</p>
        </div>
  
        <div className="flex flex-col gap-6 mb-6">
          {/* IMAGE PREVIEW */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <img src={jpgUrl!} alt="" className="w-full h-full" />
          </div>
  
          {/* POSITION Controls */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
    
              <h4 className="font-bold text-base text-black">Position</h4>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => moveTattoo('up')} className="w-14 h-14 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl flex items-center justify-center font-bold text-2xl">
                <ArrowUp className="w-6 h-6"/>
              </button>
              <div className="flex gap-2">
                <button onClick={() => moveTattoo('left')} className="w-14 h-14 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl flex items-center justify-center font-bold text-2xl">
                  <ArrowLeft className="w-6 h-6"/>
                </button>
                <button onClick={() => moveTattoo('right')} className="w-14 h-14 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl flex items-center justify-center font-bold text-2xl">
                  <ArrowRight className="w-6 h-6"/>
                </button>
              </div>
              <button onClick={() => moveTattoo('down')} className="w-14 h-14 bg-black hover:bg-neutral-800 active:scale-95 text-white rounded-xl flex items-center justify-center font-bold text-2xl">
                <ArrowDown className="w-6 h-6"/>
              </button>
            </div>
          </div>
  
          {/* SIZE Controls */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
         
              <h4 className="font-bold text-base text-black">Size</h4>
            </div>
            <div className="flex flex-col-2 items-center gap-3">
              <button onClick={() => scaleTattoo(1)} className="w-full py-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-lg">
                <ZoomIn className="w-6 h-6 mx-auto"/>
              </button>
              <button onClick={() => scaleTattoo(-1)} className="w-full py-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-lg">
                <ZoomOut className="w-6 h-6 mx-auto"/>
              </button>
            </div>
          </div>
  
          {/* FLIP Controls */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
        
              <h4 className="font-bold text-base text-black">Flip</h4>
            </div>
            <div className="flex flex-col-2 items-center gap-3">
              <button onClick={() => flipTattoo('horizontal')} className="w-full py-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-base">
                <FlipHorizontal className="w-6 h-6 mx-auto"/>
              </button>
              <button onClick={() => flipTattoo('vertical')} className="w-full py-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-base">
                <FlipVertical className="w-6 h-6 mx-auto"/>
              </button>
            </div>
          </div>
  
          {/* ROLL Controls */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">

              <h4 className="font-bold text-base text-black">Roll</h4>
            </div>
            <div className="flex flex-col-2 items-center gap-3">
              <button onClick={() => rotateTattoo('z', -1)} className="w-full py-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2">
                <RotateCcw className="w-6 h-6"/>
              </button>
              <button onClick={() => rotateTattoo('z', 1)} className="w-full py-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2">
                <RotateCw className="w-6 h-6"/>
              </button>
            </div>
          </div>
  
          {/* HISTORY Controls */}
          <div className="bg-neutral-100 p-5 rounded-xl border border-neutral-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">

              <h4 className="font-bold text-base text-black">History</h4>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={undo} 
                disabled={!canUndo}
                className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-md ${
                  canUndo 
                    ? 'bg-black hover:bg-neutral-800 text-white cursor-pointer' 
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <Undo className="w-6 h-6 mx-auto"/>
              </button>
              <button 
                onClick={redo} 
                disabled={!canRedo}
                className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-md ${
                  canRedo 
                    ? 'bg-black hover:bg-neutral-800 text-white cursor-pointer' 
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <Redo className="w-6 h-6 mx-auto"/>
              </button>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  )
  
}