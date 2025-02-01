import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import { useEffect, useLayoutEffect, useRef } from "react";
import "./sideScroll.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SideScroll() {
    const component = useRef();
    const slider = useRef();
    
    useGSAP(() => {
        const testThis = gsap.utils.toArray('.test')
        testThis.forEach((item, i) => {
            let tmln = gsap.timeline({
                defaults: {
                  ease: "none"
                },
                scrollTrigger: {
                  trigger: item,
                  pin: false,
                  start: "top bottom+=40dvh",
                  end: "bottom top",
                  scrub: 0,
                  snap: 1/12
                }
              });
            

            tmln.fromTo(item, 
                {
                    opacity: 0.1,
                    scaleX: 1
                },
                {
                    opacity: 1,
                    background: "red",
                    scaleX: 1.33,
                    filter: "blur(0px)"
                }
            )
            tmln.to(item, {
                opacity: 0.1,
                scaleX: 1,
            });
            
          });
    }, {scope: component})


    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        function raf(time){
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

    }, [])

    return (
        <div className="scroll-container" ref={component}>
            <div ref={slider} className="container">
                {Array(16).fill(null).map((_, i) => (
                    
                    <div className={`${(i <= 1 || i >= 14 )? "hide" : "test"}`}>{i-2}</div>
                ))}
            </div>
        </div>
    );
}
