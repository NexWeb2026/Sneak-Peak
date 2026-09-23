"use client";

import { Environment, Html, useFBX, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  type MutableRefObject,
} from "react";
import * as THREE from "three";

export type RotatingSneakerHandle = {
  setProgress: (progress: number) => void;
};

type RotatingSneakerProps = {
  modelPath?: string;
  targetSize?: number;
  verticalOffset?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  fill?: boolean;
  className?: string;
};

function SneakerModel({
  modelPath,
  progressRef,
  invalidateRef,
  targetSize,
  verticalOffset,
  rotationX,
  rotationY,
  rotationZ,
}: {
  modelPath: string;
  progressRef: MutableRefObject<number>;
  invalidateRef: MutableRefObject<() => void>;
  targetSize: number;
  verticalOffset: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}) {
  const pivotRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const currentProgressRef = useRef(0);
  const invalidate = useThree((state) => state.invalidate);
  const modelObject = useFBX(modelPath);
  const dcTextures = useTexture({
    map: "/models/dc-nyjah/textures/optimized/DC_Diffuse.jpg",
    normalMap: "/models/dc-nyjah/textures/optimized/DC_Normal.jpg",
    roughnessMap: "/models/dc-nyjah/textures/optimized/DC_Roughness.jpg",
    aoMap: "/models/dc-nyjah/textures/optimized/DC_AO.jpg",
  });
  const stitchTextures = useTexture({
    map: "/models/dc-nyjah/textures/Stitch_01_basecolor_01.png",
    normalMap: "/models/dc-nyjah/textures/Stitch_01_normal.png",
    alphaMap: "/models/dc-nyjah/textures/Stitch_01_alpha_01.png",
  });
  const dcMaterialTextures = useMemo(() => {
    const textures = {
      map: dcTextures.map.clone(),
      normalMap: dcTextures.normalMap.clone(),
      roughnessMap: dcTextures.roughnessMap.clone(),
      aoMap: dcTextures.aoMap.clone(),
    };

    textures.map.colorSpace = THREE.SRGBColorSpace;
    Object.values(textures).forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.needsUpdate = true;
    });

    return textures;
  }, [dcTextures]);
  const stitchMaterialTextures = useMemo(() => {
    const textures = {
      map: stitchTextures.map.clone(),
      normalMap: stitchTextures.normalMap.clone(),
      alphaMap: stitchTextures.alphaMap.clone(),
    };

    textures.map.colorSpace = THREE.SRGBColorSpace;
    Object.values(textures).forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.needsUpdate = true;
    });

    return textures;
  }, [stitchTextures]);

  useLayoutEffect(() => {
    invalidateRef.current = invalidate;

    return () => {
      invalidateRef.current = () => {};
    };
  }, [invalidate, invalidateRef]);

  useLayoutEffect(() => {
    modelObject.traverse((object) => {
      if (!(object as THREE.Mesh).isMesh) {
        return;
      }

      const mesh = object as THREE.Mesh;
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      const texturedMaterials = materials.map((material) => {
        const materialName = material?.name?.toLowerCase() ?? "";
        const isStitch = materialName.includes("stitch");

        return new THREE.MeshStandardMaterial({
          name: material?.name ?? "dc-nyjah-material",
          map: isStitch ? stitchMaterialTextures.map : dcMaterialTextures.map,
          normalMap: isStitch
            ? stitchMaterialTextures.normalMap
            : dcMaterialTextures.normalMap,
          roughnessMap: isStitch ? undefined : dcMaterialTextures.roughnessMap,
          aoMap: isStitch ? undefined : dcMaterialTextures.aoMap,
          alphaMap: isStitch ? stitchMaterialTextures.alphaMap : undefined,
          color: 0xffffff,
          roughness: isStitch ? 0.85 : 0.68,
          metalness: 0,
          transparent: isStitch,
          side: THREE.DoubleSide,
        });
      });

      mesh.material = Array.isArray(mesh.material)
        ? texturedMaterials
        : texturedMaterials[0];
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    invalidate();
  }, [dcMaterialTextures, invalidate, modelObject, stitchMaterialTextures]);

  useLayoutEffect(() => {
    const pivot = pivotRef.current;
    const model = modelRef.current;

    if (!pivot || !model) {
      return;
    }

    pivot.scale.setScalar(1);
    pivot.position.set(0, 0, 0);
    model.position.set(0, 0, 0);
    model.rotation.set(rotationX, rotationY, rotationZ);
    pivot.updateMatrixWorld(true);
    model.updateMatrixWorld(true);

    const box = new THREE.Box3();
    modelObject.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        box.union(new THREE.Box3().setFromObject(object));
      }
    });

    if (box.isEmpty()) {
      return;
    }

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = maxDimension > 0 ? targetSize / maxDimension : 1;

    pivot.scale.setScalar(scale);
    pivot.position.set(0, verticalOffset, 0);
    model.position.set(-center.x, -center.y, -center.z);
    invalidate();
  }, [
    invalidate,
    modelObject,
    rotationX,
    rotationY,
    rotationZ,
    targetSize,
    verticalOffset,
  ]);

  useFrame((_, delta) => {
    const pivot = pivotRef.current;

    if (!pivot) {
      return;
    }

    const nextProgress = THREE.MathUtils.damp(
      currentProgressRef.current,
      progressRef.current,
      4.8,
      delta,
    );
    const shouldKeepRendering =
      Math.abs(nextProgress - progressRef.current) > 0.0005;

    currentProgressRef.current = nextProgress;
    pivot.rotation.y = currentProgressRef.current * Math.PI * 2;

    if (shouldKeepRendering) {
      invalidate();
    }
  });

  return (
    <group ref={pivotRef}>
      <group ref={modelRef}>
        <primitive object={modelObject} />
      </group>
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-md bg-brand-ink px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-bone">
        Loading sneaker
      </div>
    </Html>
  );
}

export const RotatingSneaker = forwardRef<
  RotatingSneakerHandle,
  RotatingSneakerProps
>(function RotatingSneaker(
  {
    modelPath = "/models/dc-nyjah/source/Sketchfab_2022_01_27_21_08_33.fbx",
    targetSize = 8,
    verticalOffset = -0.35,
    rotationX = -Math.PI / 2,
    rotationY = 0,
    rotationZ = 0,
    fill = false,
    className = "",
  },
  ref,
) {
  const progressRef = useRef(0);
  const invalidateRef = useRef<() => void>(() => {});

  useImperativeHandle(
    ref,
    () => ({
      setProgress: (progress) => {
        progressRef.current = progress;
        invalidateRef.current();
      },
    }),
    [],
  );

  return (
    <div
      className={`w-full min-w-0 ${fill ? "h-full" : "h-[440px] md:h-[600px] lg:h-[660px]"} ${className}`}
      aria-label="Scroll-controlled 3D sneaker model"
    >
      <Canvas
        orthographic
        frameloop="demand"
        camera={{ position: [0, 0, 10], zoom: 72 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 4, 5]} intensity={2.6} />
        <directionalLight position={[-3, 1, -2]} intensity={1} />
        <Suspense fallback={<Loader />}>
          <SneakerModel
            modelPath={modelPath}
            progressRef={progressRef}
            invalidateRef={invalidateRef}
            targetSize={targetSize}
            verticalOffset={verticalOffset}
            rotationX={rotationX}
            rotationY={rotationY}
            rotationZ={rotationZ}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
});

useFBX.preload("/models/dc-nyjah/source/Sketchfab_2022_01_27_21_08_33.fbx");
