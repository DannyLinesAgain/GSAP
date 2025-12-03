import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Gallery from "./Pages/Gallery/Gallery";
import './App.css'


const App = () => {  
  return (
    <div className="App">
      <Gallery />
    </div>
  );
}
export default App