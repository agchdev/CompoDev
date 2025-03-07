import { useRef, useState } from "react"
import { Link } from "react-router-dom"


const Buscador = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [lupaOpen, setLupaOpen] = useState(false)
  const [buscando, setBuscando] = useState("")

  const busca = useRef(null)
  const divCosas = useRef(null)
  const muchosLinks = useRef(null)
  const inpText = useRef(null)
  const inpBusca = useRef(null)

  const abreBuscador = () => {
    setLupaOpen(!lupaOpen)
    if (lupaOpen) {
      busca.current.classList.add("w-[70%]", "m-auto", "py-1")
      divCosas.current.classList.add("flex-col")
      muchosLinks.current.classList.add("m-auto")
      inpText.current.classList.remove("hidden")
      inpBusca.current.classList.remove("hidden")
      inpText.current.focus()
    }else{
      busca.current.classList.remove("w-[70%]", "m-auto", "py-1")
      divCosas.current.classList.remove("flex-col")
      muchosLinks.current.classList.remove("m-auto")
      inpText.current.classList.add("hidden")
      inpBusca.current.classList.add("hidden")
    }
    
  } 
  return (
    <>
      <Link 
          className='mt-6 lg:my-auto bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 rounded-3xl py-2 px-3 flex gap-6 shadow-md transition-all items-center justify-center'
          to="/search"
          ref={busca}
        >
          <img
            className='transition-all'
            src="../../../public/uploads/lupa.svg" alt="lupa" 
            onClick={abreBuscador}
          />
          <input 
            ref={inpText} 
            className='w-full bg-black/70 rounded-3xl hidden text-white transition-all px-3 py-1.5' 
            type="text"
            value={buscando}
            onChange={(e) => {
              setBuscando(e.target.value)
              console.log(buscando)
            }}
          />
          <input 
            className='hidden rounded-full bg-[#1d1d1d] py-2 px-5 cursor-pointer hover:bg-black/70'
            ref={inpBusca} 
            type="submit"
          />
        </Link>
      <div className='absolute bg-gradient-to-tl from-black via-black/95 to-indigo-600/0 w-full h-screen'></div>
      <div className="min-h-screen bg-black flex justify-center items-center [background-image:linear-gradient(#333_1px,transparent_1px),linear-gradient(90deg,#333_1px,transparent_1px)] [background-size:50px_50px]">
      </div>
    </>
  )
}

export default Buscador