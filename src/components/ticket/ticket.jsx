import React from 'react'

import s from './ticket.module.css'

export default function Ticket() {
  return (
    <main className={s.ticket}>
      <div className={s.rowOne}>
        <div className={s.prase}>1500</div>
        <div className={s.company}>
          <img alt="compLogo" className={s.companyLogo} />
        </div>
      </div>
      <div className={s.rowTwo}>
        <div className={s.time}>
          <p className={s.point}>Mow-Volg</p>
          <p className={s.pointTime}>10:45-8:00</p>
        </div>
        <div className={s.flay}>
          <p className={s.flayTime}>В пути</p>
          <p>21ч15мин</p>
        </div>
        <div className={s.where}>
          <p className={s.transfer}>2 пересадки</p>
          <p>HKG</p>
        </div>
      </div>
      <div className={s.rowThree}>
        <div className={s.time}>
          <p className={s.point}>Mow-Volg</p>
          <p className={s.pointTime}>10:45-8:00</p>
        </div>
        <div className={s.flay}>
          <p className={s.flayTime}>В пути</p>
          <p>21ч15мин</p>
        </div>
        <div className={s.where}>
          <p className={s.transfer}>3 пересадки</p>
          <p>HKG</p>
        </div>
      </div>
    </main>
  )
}
