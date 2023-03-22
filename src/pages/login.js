import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {Button, TextField, Grid, Card, CardContent, Typography } from '@mui/material'
import Swal from 'sweetalert2'

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Verificar si el usuario ya inició sesión
    const isLoggedIn = checkIfUserIsLoggedIn()
    isLoggedIn ?  router.push('/') :  router.push('/login')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isAuthenticated = await authenticateUser(email, password)
    isAuthenticated ? router.push('/') : router.push('/login')
  }

  const checkIfUserIsLoggedIn = () => {
    if(localStorage.getItem('sessionToken')){
      return true
    }else{
      return false
    }
  }

  const authenticateUser = async (email, password) => {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    const url = 'http://10.80.100.10:3001/api/log'
    email = email.trim()
    password = password.trim()

    if (email && password) {
      if (emailRegex.test(email)) {
        let data = { mail: email, password: password }
       return fetch(url, {
          method: 'POST', 
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then(response => {
            if(response.content.status){
              localStorage.setItem('sessionToken', response.content.token)
              return true
            }else{
              SwalMessage(response.content.message, 'error')
              return false
            }
          })
          .catch(error => SwalMessage('Error del servidor'+error, 'error'))
      } else {
        SwalMessage('El formato del email es incorrecto', 'error')
        return false
      }
    } else {
      SwalMessage('No puede haber campos vacios', 'error')
      return false
    }
  }

  const SwalMessage = (msg, icon) => {
    Swal.fire({
      icon: icon,
      title: msg,
      showConfirmButton: false,
      timer: 1500
    })
  }
  
  return (
    <div style={{ marginTop: '20px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
            <Typography variant="h4" noWrap>
             Login
            </Typography>
              <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
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
