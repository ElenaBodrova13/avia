import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'antd'

import * as actions from '../../actions'
import SideBar from '../side-bar'
import Header from '../header'
import Footer from '../footer'
import Logo from '../logo'
import Ticket from '../ticket'
import Loading from '../loading'
import Progres from '../progres'

import s from './app.module.css'

function App({
  tickets,
  getInitialTickets,
  ticketsSortMore,
  moreSorted,
  getAllTickets,
  counter,
  ticketsSort,
  checkboxes,
  isDone,
  isStart,
  error,
}) {
  useEffect(() => {
    getAllTickets()
    console.log(1, tickets)
  }, [])
  console.log(moreSorted, ticketsSortMore, getInitialTickets, isStart, getInitialTickets)
  console.log(2, tickets)
  /*
  if (isDone && isStart) {
    console.log('getinitstate', tickets)
    getInitialTickets(tickets)
  }
    
 */
  let showTickets = tickets.map((t) => {
    t.new = 15
    /* t.price + t.segments[0].duration * 15
     */
    return t
  })
  console.log(3, tickets)
  console.log('showtickets', showTickets)
  if (
    !checkboxes[0].checked &&
    (checkboxes[1].checked || checkboxes[2].checked || checkboxes[3].checked || checkboxes[4].checked)
  ) {
    showTickets = ticketsSort
  }

  const persent = (tickets.length * 100) / 9000

  const newArr = showTickets.slice(0, counter)

  const element = newArr.map((t) => (
    <Ticket
      key={`${t.price}${t.carrier}${t.segments[0].duration}`}
      price={t.price}
      logo={t.carrier}
      from={t.segments[0].origin}
      to={t.segments[0].destination}
      dateFrom={t.segments[0].date}
      durationFrom={t.segments[0].duration}
      stopsFrom={t.segments[0].stops}
      stopsTo={t.segments[1].stops}
      durationTo={t.segments[1].duration}
      dateTo={t.segments[1].date}
    />
  ))
  const alert = checkboxes.every((checkbox) => !checkbox.checked) ? (
    <Alert message="Рейсов, подходящих под заданные фильтры, не найдено" />
  ) : null
  const ticket = alert ? null : element
  let louder
  if (!isDone && tickets.length === 0) {
    louder = <Loading />
  }

  const mistake =
    error && !tickets ? (
      <Alert
        message="Что то пошло не совсем по плану"
        description={`Произошла ошибка: ${error.message}`}
        type="error"
      />
    ) : null

  return (
    <div className={s.fon}>
      <Logo />
      <Progres persent={persent} />
      <div className={s.wrapper}>
        <SideBar />
        <div className={s.mane}>
          <Header />
          {alert}
          {mistake}
          {ticket}
          {louder}
          <Footer />
        </div>
      </div>
    </div>
  )
}

function mapSate(state) {
  console.log('state', state)
  return {
    checkboxes: state.checkboxes,
    tickets: state.tickets,
    counter: state.counter,
    ticketsSort: state.ticketsSort,
    isDone: state.isDone,
    error: state.error,
    ticketsSortMore: state.ticketsSortMore,
    moreSorted: state.moreSorted,
    isStart: state.isStart,
  }
}
export default connect(mapSate, actions)(App)
