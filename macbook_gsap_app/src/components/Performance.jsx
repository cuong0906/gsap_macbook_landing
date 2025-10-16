import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { performanceImages, performanceImgPositions } from "../constants";

const Performance = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  // setup animations using useGSAP for scoping and React integration
  useGSAP(() => {
    // text animation - runs on all sizes
    gsap.fromTo(
    //   contentRef.current,
      ".content p",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
        //   trigger: sectionRef.current,
          trigger: ".content p",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );

    if (isMobile) return;
    
      // desktop: scrubbed timeline for images
      const tl = gsap.timeline({
        defaults: { ease: "power1.out", duration: 2, overwrite: "auto" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center top",
          scrub: 1,
          pin: false,
          invalidateOnRefresh: true,
        },
      });

      // initialize all images to an offscreen/offset state and then animate to final positions
    //   performanceImages.forEach(({ id }) => {
    //     if(id === 'p5') return; // skip p5 as it is animated differently
    //     const el = sectionRef.current.querySelector(`#${id}`);
    //     if (!el) return;
    //     // set initial style so timeline can animate to the final position
    //     // gsap.set(el, { opacity: 0, y: 40 });
    //   });

      // apply all image animations at timeline time 0 so they are scrubbed together
      performanceImgPositions.forEach((pos) => {
        if(pos.id === 'p5') return; // skip p5 as it is animated differently
        const el = `.${pos.id}`;
        if (!el) return;

        const animProps = {};
        if (typeof pos.left !== 'undefined') animProps.left = `${pos.left}%`;
        if (typeof pos.right !== 'undefined') animProps.right = `${pos.right}%`;
        if (typeof pos.bottom !== 'undefined') animProps.bottom = `${pos.bottom}%`;
        if (pos.transform) animProps.transform = pos.transform;

        // apply as a 'to' at time 0 so scrub affects them equally
        tl.to(el, animProps, 0);
      });
    // no explicit cleanup needed for the small text animation since ScrollTrigger is attached
  }, { scope: sectionRef, dependencies: [isMobile] });

  return (
    <section id="performance" ref={sectionRef}>
        <h2>Next level performance. Game-on.</h2>
        <div className="wrapper">
            {performanceImages.map(({id, src}) => (
                <img key={id} id={id} className={id} src={src} alt={`${id}`} />
            ))}
        </div>
        <div className="content" ref={contentRef}>
            <p>
                With the blazing-fast M1 Pro and M1 Max chips, 
                the MacBook Pro is a beast. Whether you’re compiling code, 
                <span className="text-white">rendering 3D models, or juggling multiple pro apps and browser tabs, </span>
                {' '}
                everything feels fluid and responsive. Even with demanding workloads, 
                the MacBook Pro stays cool and quiet, so you can focus on your work — not your machine.</p>
        </div>
    </section>
  )
}

export default Performance