import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import s from './footer.module.css'

function Footer({ moreTickets }) {
  return (
    <footer className={s.footer}>
      <div className={s.btnWrapper}>
        <button className={s.btn} type="button" onClick={moreTickets}>
          Показать еще 5 билетов!
        </button>
      </div>
    </footer>
  )
}
function mapSate(state) {
  return {
    tickets: state.tickets,
  }
}
export default connect(mapSate, actions)(Footer)
