import React from 'react'

import SideBar from '../side-bar'
import Header from '../header'
import Ticket from '../ticket'
import Footer from '../footer'
import Logo from '../logo'

import s from './app.module.css'

function App() {
  return (
    <>
      <Logo />
      <div className={s.wrapper}>
        <SideBar />
        <div className={s.mane}>
          <Header />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Ticket />
          <Footer />
        </div>
      </div>
    </>
  )
}
export default App
