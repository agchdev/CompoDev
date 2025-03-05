import React from 'react'
import '../Bubble.css'
import Bubble from '../Bubble'
import ScrambleTextReact from './ScrambleTextReact'

const Banner = () => {
    return (
        <section>
            <div className='w-full h-screen text-white flex items-center justify-center text-center'>
                <div className='absolute z-1 drop-shadow-xl'>
                    <h2 className='font-semibold text-4xl uppercase'>La Biblia de los programadores</h2>
                    <ScrambleTextReact />
                    {/* <h1 className='font-bold text-9xl bg-gradient-to-r from-white to-white transition-all duration-100 hover:from-fuchsia-500 hover:to-cyan-500 inline-block text-transparent bg-clip-text font-roboto'>COMPODEV</h1> */}
                </div>
                <Bubble />
            </div>
            
        </section>

    )
}

export default Banner