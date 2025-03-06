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
    <div className="text-white col-span-5 row-span-2 border rounded-3xl">
      <div className="w-full h-full flex justify-center">
        <div className="flex items-center">
          <div>
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
              <img className="relative object-cover" src={urlFoto} alt="" />
            </div>
            <p>Seguidores:</p>
          </div>
          
          <div className="flex flex-col ml-2">
              <p className="font-bold w-[50%]">{res.usuario[0].user}</p>
              <p className="font-light w-[50%]">{res.usuario[0].descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerProfile
