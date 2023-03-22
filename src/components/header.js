import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, FormControl, Select, MenuItem } from '@mui/material'

const NavBar = () => {
  const [language, setLanguage] = useState('es')
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          My Next.js App
        </Typography>
        <div style={{ marginLeft: 'auto' }}>
          <Select
            style={{color: 'white'}}
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar