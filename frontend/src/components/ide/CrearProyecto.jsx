import './CrearProyecto.css'

const CrearProyecto = () => {
  return (
    <>
      <div className='absolute bg-gradient-to-tl from-black via-black/95 to-indigo-600/0 w-full h-screen'></div>
      <div className="min-h-screen bg-black flex justify-center items-center [background-image:linear-gradient(#333_1px,transparent_1px),linear-gradient(90deg,#333_1px,transparent_1px)] [background-size:50px_50px]">
        <div className='p-5 bg-white relative z-10 rounded-3xl'>
          <form className='flex flex-col'>
            <input
              type="text"
              placeholder='Nombre...'
            />
            <input
              type="text"
              placeholder='Descripcion...'
            />
            <button className="shiny-cta">
              <span>Iniciar</span>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CrearProyecto