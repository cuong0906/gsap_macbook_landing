import { useEffect, useRef } from "react"

const Hero = () => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2.0 ;
        }
    }, []);

  return (
    <section id="hero">
        <div>
            <h1>MacBook Pro 14-inch and 16-inch</h1>
            <img src="/title.png" alt="M1 Pro and M1 Max" />
        </div>
        <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline/>
        <button>Buy</button>
        <p>From 1599$ or 400$/month</p>
    </section>
  )
}

export default Hero