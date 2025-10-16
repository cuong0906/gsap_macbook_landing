import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive"

const Showcase = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    useGSAP(() => {
        if(!isTablet){
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#showcase",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                }
            });
            timeline.to(".mask img", {
                transform: "scale(1.1)",
            }).to(".content ", {
                opacity: 1,
                y: 0,
                ease: "power1.in",
            });
        }
    }, [isTablet]);
  return (
    <section id="showcase">
        <div className="media">
            <video src="/videos/game.mp4" autoPlay muted loop playsInline></video>
            <div className="mask" >
                <img src="/mask-logo.svg" alt="Apple Logo" />
            </div>
        </div>
        <div className="content">
            <div className="wrapper">
                <div className="lg:max-w-md">
                    <h2>Rockets Chip</h2>
                    <div className="space-y-5 mt-7 pe-10">
                        <p>
                            Introduction {" "}
                            <span className="text-white">M1 Pro</span> and
                            , the first chips designed for the MacBook Pro. 
                        </p>
                        <p>
                            With incredible performance, custom technologies, and amazing battery life, they take 
                            everything you do to a whole new level.
                        </p>
                        <p className="text-primary">Learn more</p>
                    </div>
                </div>
                <div className="max-w-3xs space-y-14">
                    <div className="space-y-2">
                        <p>Up to</p>
                        <h3>4x faster</h3>
                        <p>pro rendering performance than M2</p>
                    </div>
                    <div className="space-y-2">
                        <p>Up to</p>
                        <h3>1.5x faster</h3>
                        <p>CPU performance</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Showcase