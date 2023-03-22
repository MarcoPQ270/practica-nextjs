import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Swal from 'sweetalert2'



const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Verificar si el usuario ya inició sesión
    const isLoggedIn = checkIfUserIsLoggedIn()

    if (isLoggedIn) {
      // Si ya inició sesión, redirigir al usuario a la página principal
      router.push('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Autenticar al usuario
    const isAuthenticated = await authenticateUser(email, password)

    if (isAuthenticated) {
      // Si la autenticación es exitosa, redirigir al usuario a la página principal
      router.push('/')
    } else {
      
    }
  }

  const checkIfUserIsLoggedIn = () => {
    // Aquí iría tu código para verificar si el usuario ya inició sesión
    // Deberías devolver true si el usuario ya inició sesión y false si no
    return false
  }

  const authenticateUser = async (email, password) => {
   if(email && password){
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(email)) {
     return true
    } else {
      Swal.fire({
        icon: 'error',
        title: 'El formato del email es incorrecto',
        showConfirmButton: false,
        timer: 1500
      })
    }
   }else{
    Swal.fire({
      icon: 'error',
      title: 'No puede haber campos vacios',
      showConfirmButton: false,
      timer: 1500
    })
   }
  }

  return (
    <div style={{marginTop:'20px'}}>
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Iniciar sesión
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
  )
}

export default LoginPage
