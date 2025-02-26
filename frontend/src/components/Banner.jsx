import React from 'react'
import './Banner.css'

const Banner = () => {
    return (
        <section>
            <div className='w-full h-screen text-white flex items-center justify-center text-center'>
                <div className='absolute z-1 drop-shadow-xl'>
                    <h2 className='font-semibold text-4xl uppercase'>La Biblia de los programadores</h2>
                    <h1 className='font-bold text-9xl bg-gradient-to-r from-white to-white transition-all duration-100 hover:from-fuchsia-500 hover:to-cyan-500 inline-block text-transparent bg-clip-text font-roboto'>COMPODEV</h1>
                </div>
                <div class="gradient-bg">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>
                    <div class="gradients-container">
                        <div class="g1"></div>
                        <div class="g2"></div>
                        <div class="g3"></div>
                        <div class="g4"></div>
                        <div class="g5"></div>
                        <div class="interactive"></div>
                    </div>
                </div>
            </div>
            
        </section>

    )
}

export default Banner