import React from 'react'

import Logotip from '../img/Logotip.png'

import s from './logo.module.css'

export default function Logo() {
  return (
    <div>
      <img alt="logo" className={s.logo} src={Logotip} />
    </div>
  )
}
