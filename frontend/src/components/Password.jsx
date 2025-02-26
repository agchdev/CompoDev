import React, { useState } from 'react'

const Password = ({setPassword}) => {
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    return (
        <>
            <input
                type="password"
                placeholder='Contraseña..'
                value={pass}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder='Contraseña..'
                value={pass2}
                onChange={(e) => setPassword(e.target.value)}
            />
        </>
    )
}

export default Password