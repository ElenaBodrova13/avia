import React from 'react'
import { add, format } from 'date-fns'

import s from './ticket.module.css'

export default function Ticket({
  price,
  logo,
  from,
  to,
  dateFrom,
  durationFrom,
  stopsFrom,
  stopsTo,
  durationTo,
  dateTo,
}) {
  return (
    <main className={s.ticket}>
      <div className={s.rowOne}>
        <div className={s.prase}>{price}</div>
        <div className={s.company}>
          <img alt={logo} className={s.companyLogo} src={`https://pics.avs.io/110/36/${logo}.png`} />
        </div>
      </div>
      <div className={s.rowTwo}>
        <div className={s.time}>
          <p className={s.point}>
            {from}-{to}
          </p>
          <Time dateFrom={dateFrom} timeInFly={durationFrom} />
        </div>
        <div className={s.flay}>
          <p className={s.flayTime}>В пути</p>
          <p>
            {Math.floor(durationFrom / 60)}ч{durationFrom % 60}мин
          </p>
        </div>
        <Stops stop={stopsFrom} />
      </div>
      <div className={s.rowThree}>
        <div className={s.time}>
          <p className={s.point}>
            {to}-{from}
          </p>
          <Time dateFrom={dateTo} timeInFly={durationTo} />
        </div>
        <div className={s.flay}>
          <p className={s.flayTime}>В пути</p>
          <p>
            {Math.floor(durationTo / 60)}ч{durationTo % 60}мин
          </p>
        </div>
        <Stops stop={stopsTo} />
      </div>
    </main>
  )
}

function Stops({ stop }) {
  let citis = ''
  let chenchTo = 'без пересадок'
  if (stop.length === 1) {
    chenchTo = '1 пересадка'
    citis = stop
  }
  if (stop.length === 2) {
    chenchTo = '2 пересадки'
    citis = stop.join(', ')
  }
  if (stop.length === 3) {
    chenchTo = '3 пересадки'
    citis = stop.join(', ')
  }

  return (
    <div className={s.where}>
      <p className={s.transfer}>{chenchTo} </p>
      <p>{citis}</p>
    </div>
  )
}

function Time({ dateFrom, timeInFly }) {
  const result = add(new Date(dateFrom), {
    minutes: timeInFly,
  })
  const timeFrom = format(new Date(dateFrom), ' h:mm ')
  const timeTo = format(result, ' h:mm ')
  return (
    <p className={s.pointTime}>
      {timeFrom}-{timeTo}
    </p>
  )
}
