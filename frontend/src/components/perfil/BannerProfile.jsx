import { useEffect, useState } from "react"

const BannerProfile = ({ res }) => {
  const [logeado, setLogeado] = useState(false)
  const [urlFoto, setUrlFoto] = useState("")

  useEffect(() => {
    if (res && res.status === "success") {
      setLogeado(true)
      const url = res.usuario[0]?.urlFoto.slice(1) // protege el acceso con "?"
      setUrlFoto("http://localhost/CompoDev/backend" + url)
    } else {
      setLogeado(false)
    }
  }, [res])

  // Si res no existe o res.status !== "success", retornamos algo alternativo
  if (!res || res.status !== "success") {
    return <div>Loading o usuario no logeado</div>
  }

  return (
    <div className="text-white col-span-6 lg:col-span-5 row-span-2 border rounded-3xl overflow-hidden relative">
      <div className="absolute w-full h-[60%] bg-red-300">

      </div>
      <div className="w-full h-full flex items-end justify-center sm:justify-start">
        <div className="realtive flex flex-col lg:flex-row items-center ml-5 z-22">
          <div className="mb-3">
            <div className="w-[150px] h-[150px] sm:w-[110px] sm:h-[110px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden">
              <img className="relative object-cover" src={urlFoto} alt="" />
            </div>
            <p className="text-center">100 subs</p>
          </div>
          
          <div className="flex flex-col lg:ml-2 mb-10 lg:mt-10">
              <p className="font-bold lg:text-start text-center lg:w-[50%] z-20">{res.usuario[0].user}</p>
              <p className="font-light hidden sm:flex lg:text-start text-center lg:w-[50%] z-20">{res.usuario[0].descripcion}</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default BannerProfile
