"use client";

import { Environment, Html, useTexture } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";
import { Button } from "@/components/ui/Button";
import { ScrollTrigger } from "@/lib/gsap";

type TerrexModelHandle = {
  setProgress: (progress: number) => void;
};

const TerrexModel = forwardRef<TerrexModelHandle>(function TerrexModel(_, ref) {
  const pivotRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const invalidate = useThree((state) => state.invalidate);
  const modelObject = useLoader(
    OBJLoader,
    "/models/adidas-terrex/source/Terrex.obj",
  );
  const textures = useTexture({
    map: "/models/adidas-terrex/textures/optimized/Terrex_D.jpg",
    normalMap: "/models/adidas-terrex/textures/optimized/Terrex_N.jpg",
    roughnessMap: "/models/adidas-terrex/textures/optimized/Terrex_R.jpg",
    aoMap: "/models/adidas-terrex/textures/optimized/Terrex_AO.jpg",
  });
  const materialTextures = useMemo(() => {
    const clonedTextures = {
      map: textures.map.clone(),
      normalMap: textures.normalMap.clone(),
      roughnessMap: textures.roughnessMap.clone(),
      aoMap: textures.aoMap.clone(),
    };

    clonedTextures.map.colorSpace = THREE.SRGBColorSpace;
    Object.values(clonedTextures).forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.needsUpdate = true;
    });

    return clonedTextures;
  }, [textures]);

  useLayoutEffect(() => {
    const pivot = pivotRef.current;
    const model = modelRef.current;

    if (!pivot || !model) {
      return;
    }

    modelObject.traverse((object) => {
      if (!(object as THREE.Mesh).isMesh) {
        return;
      }

      const mesh = object as THREE.Mesh;
      mesh.material = new THREE.MeshStandardMaterial({
        map: materialTextures.map,
        normalMap: materialTextures.normalMap,
        roughnessMap: materialTextures.roughnessMap,
        aoMap: materialTextures.aoMap,
        color: 0xffffff,
        roughness: 0.86,
        metalness: 0,
        side: THREE.DoubleSide,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    pivot.scale.setScalar(1);
    pivot.position.set(0, 0, 0);
    pivot.rotation.set(0, progressRef.current * Math.PI * 2, 0);
    model.position.set(0, 0, 0);
    model.rotation.set(-Math.PI / 2, 0, -0.08);
    pivot.updateMatrixWorld(true);
    model.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = maxDimension > 0 ? 6.4 / maxDimension : 1;

    pivot.scale.setScalar(scale);
    pivot.position.set(0, -0.12, 0);
    model.position.set(-center.x, -center.y, -center.z);
    invalidate();
  }, [invalidate, materialTextures, modelObject]);

  useImperativeHandle(
    ref,
    () => ({
      setProgress: (progress: number) => {
        progressRef.current = THREE.MathUtils.clamp(progress, 0, 1);

        if (pivotRef.current) {
          pivotRef.current.rotation.y = progressRef.current * Math.PI * 2;
          invalidate();
        }
      },
    }),
    [invalidate],
  );

  return (
    <group ref={pivotRef}>
      <group ref={modelRef}>
        <primitive object={modelObject} />
      </group>
    </group>
  );
});

function ModelLoader() {
  return (
    <Html center>
      <div className="rounded-md bg-brand-bone px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-ink">
        Loading Terrex
      </div>
    </Html>
  );
}

export function TerrexShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const modelRef = useRef<TerrexModelHandle | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!section || prefersReducedMotion) {
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=180%",
        pin: true,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        refreshPriority: 10,
        invalidateOnRefresh: true,
        onRefresh: (self) => modelRef.current?.setProgress(self.progress),
        onUpdate: (self) => modelRef.current?.setProgress(self.progress),
      });

      return () => trigger.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-brand-ink px-4 py-20 text-brand-bone sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="relative h-[560px] overflow-hidden rounded-md bg-[#111]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(220,63,44,0.22),transparent_38%)]" />
          <Canvas
            className="absolute inset-0 h-full w-full"
            orthographic
            frameloop="demand"
            camera={{ position: [0, 0, 10], zoom: 60 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 5]} intensity={2.4} />
            <directionalLight position={[-4, 1, -2]} intensity={0.9} />
            <Suspense fallback={<ModelLoader />}>
              <TerrexModel ref={modelRef} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
            Trail ready
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">
            Adidas Terrex terrain test
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-brand-bone/70">
            Built for steep climbs and fast descents, with technical grip,
            durable overlays, and a locked-in fit for unpredictable terrain.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop" variant="secondary">
              Explore trail drops
            </Button>
            <span className="inline-flex h-11 items-center text-sm font-semibold uppercase text-brand-bone/60">
              Rotate to inspect
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
