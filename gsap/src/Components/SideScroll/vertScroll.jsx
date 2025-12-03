import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import { useEffect, useLayoutEffect, useRef } from "react";
import "./vertScroll.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function VertScroll() {
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
                  start: "top+=150 bottom",
                  end: "bottom-=150 top",
                  scrub: 0,
                },
                onUpdate: () => {console.log(i)}
            });


            let imgTmln = gsap.timeline({
                defaults: {
                  ease: "none"
                },
                scrollTrigger: {
                  trigger: item,
                  pin: false,
                  start: "top+=150 bottom",
                  end: "bottom-=150 top",
                  scrub: 0,
                },
                onUpdate: () => {console.log(i)}
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
            ).to(item, {
                opacity: 0.1,
                scaleX: 1,
                background: "white"
            });

            let imgTarg = item.querySelector('.card-img');
            imgTmln
                .fromTo(imgTarg, 
                    {
                        scaleY: 1
                    },
                    {
                        scaleY: 1.33,
                    }, '<'
                )
                .to(imgTarg, {
                    scaleY: 1,
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
                    <div className={`${(i <= 1 || i >= 14 )? "hide" : "test"}`}>
                        {
                            !(i <= 1 || i >= 14 )&&
                            <div className="card-img" 
                                style={{
                                    backgroundImage: `url("../img/${i % 6}.webp")`,
                                }}
                            />
                        }
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
