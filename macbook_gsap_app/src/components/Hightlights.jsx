import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive"

const Hightlights = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    useGSAP(() => {
        gsap.to(['.left-column', '.right-column'], {
            scrollTrigger: {
                trigger: "#highlights",
                start:  isMobile ? "bottom bottom" : "top top",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
            stagger: 0.5,
        })
    }, []);
  return (
    <section id="highlights">
        <h2>There's never been a better time to upgrade</h2>
        <h3>Here's what you get with the new MacBook Pro.</h3>

        <div className="masonry">
            <div className="left-column">
                <div>
                    <img src="/laptop.png" alt="Laptop" />
                    <p>Up to 22 hours of battery life</p>
                </div>
                <div>
                    <img src="/sun.png" alt="Sun" />
                    <p>Brilliant <br/>
                        1000 bits  <br/>XDR display</p>
                </div>
            </div>
            <div className="right-column">
                <div className="apple-gradient">
                    <img src="/ai.png" alt="AI" />
                    <p>Built for <br/>
                    <span>Apple Intelligent</span></p>
                </div>
                <div>
                    <img src="/battery.png" alt="Battery" />
                    <p>Up to 
                        <span>14 more hours</span> <br/>battery life. <span className="text-dark-100">(24 hours total).</span></p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hightlights