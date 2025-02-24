import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Login = () => {
  const trayRef = useRef(null);
  const povRef = useRef(null);
  const diceRefs = useRef([]);

  const n = 19;
  const rots = [
    { ry: 270, a: 0.5 },
    { ry: 0, a: 0.85 },
    { ry: 90, a: 0.4 },
    { ry: 180, a: 0.0 }
  ];

  useEffect(() => {
    gsap.set(".face", {
      z: 200,
      rotateY: (i) => rots[i % rots.length].ry,
      transformOrigin: "50% 50% -201px",
    });

    diceRefs.current.forEach((die, i) => {
      const cube = die.querySelector(".cube");

      gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "power3.inOut", duration: 1 } })
        .fromTo(
          cube,
          { rotateY: -90 },
          { rotateY: 90, ease: "power1.inOut", duration: 2 }
        )
        .fromTo(
          cube.querySelectorAll(".face"),
          {
            color: (j) => `hsl(${(i / n) * 75 + 130}, 67%, ${100 * [rots[3].a, rots[0].a, rots[1].a][j]}%)`
          },
          {
            color: (j) => `hsl(${(i / n) * 75 + 130}, 67%, ${100 * [rots[0].a, rots[1].a, rots[2].a][j]}%)`
          },
          0
        )
        .to(
          cube.querySelectorAll(".face"),
          {
            color: (j) => `hsl(${(i / n) * 75 + 130}, 67%, ${100 * [rots[1].a, rots[2].a, rots[3].a][j]}%)`
          },
          1
        )
        .progress(i / n);
    });

    gsap.timeline()
      .from(trayRef.current, { yPercent: -3, duration: 2, ease: "power1.inOut", yoyo: true, repeat: -1 }, 0)
      .fromTo(trayRef.current, { rotate: -15 }, { rotate: 15, duration: 4, ease: "power1.inOut", yoyo: true, repeat: -1 }, 0)
      .from(".die", { duration: 0.01, opacity: 0, stagger: { each: -0.05, ease: "power1.in" } }, 0)
      .to(trayRef.current, { scale: 1.2, duration: 2, ease: "power3.inOut", yoyo: true, repeat: -1 }, 0);

    const updateScale = () => {
      const h = n * 56;
      gsap.set(trayRef.current, { height: h });
      gsap.set(povRef.current, { scale: window.innerHeight / h });
    };

    window.onload = window.onresize = updateScale;
    updateScale();
  }, []);

  return (
    <div className="pov" ref={povRef}>
      <div className="tray" ref={trayRef}>
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} className="die" ref={(el) => (diceRefs.current[i] = el)}>
            <div className="cube">
              <div className="face">CODE</div>
              <div className="face">DRIVEN</div>
              <div className="face">ANIMATION</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
