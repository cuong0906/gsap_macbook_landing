import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1; // seconds
const OFFSET_DISTANCE = 5; // units

const fadeMeshes = (group, opacity) => {
    // Logic to fade meshes in and out
    if(!group) return;
    group.traverse((child) =>{
        if(child.isMesh){
            child.material.transparent = true;
            gsap.to(child.material, {
                duration: ANIMATION_DURATION,
                opacity: opacity,
            });
        }
    })
}

const moveGroup = (group, x) => {
    if(!group) return;
    gsap.to(group.position, {
        duration: ANIMATION_DURATION,
        x,
    });
}

const ModelSwitcher = ({scale, isMobile}) => {
    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;
    const smallMacBookRef = useRef();
    const largeMacBookRef = useRef();

    const showLargeMacBook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    useGSAP(() => {
        if(showLargeMacBook){
            moveGroup(largeMacBookRef.current, 0);
            moveGroup(smallMacBookRef.current, -OFFSET_DISTANCE);
            fadeMeshes(smallMacBookRef.current, 0);
            fadeMeshes(largeMacBookRef.current, 1);
        }else{
            moveGroup(largeMacBookRef.current, -OFFSET_DISTANCE);
            moveGroup(smallMacBookRef.current, 0);
            fadeMeshes(smallMacBookRef.current, 1);
            fadeMeshes(largeMacBookRef.current, 0);
        }
    }, [scale]);

    const controlConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        azimuth: [-Infinity, Infinity],
        config:{mass: 1, tension: 0, friction: 26},
        // polar: [-Math.PI , Math.PI],
    };

  return (
    <>
        <PresentationControls {...controlConfig}>
            <group ref={largeMacBookRef}>
                <MacbookModel16 scale={isMobile ? 0.05: 0.08}/>
            </group>
        </PresentationControls>
        <PresentationControls {...controlConfig}>
            <group ref={smallMacBookRef}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06}/>
            </group>
        </PresentationControls>
    </>
  )
}

export default ModelSwitcher