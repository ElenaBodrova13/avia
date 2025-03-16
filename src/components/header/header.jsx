import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import s from './header.module.css'

function Header({ sortChip, sortOptimal, sortFaster, moreSorted }) {
  const x = `${s.active} ${s.btn}`

  return (
    <header>
      <div className={s.header}>
        <div className={s.btnWrapper}>
          <button
            className={moreSorted === 'chip' ? x : s.btn}
            type="button"
            id="chip"
            onClick={(e) => {
              sortChip(e.target.id)
            }}
          >
            Самый дешевый
          </button>
        </div>
        <div className={s.btnWrapper}>
          <button
            id="fast"
            className={moreSorted === 'fast' ? x : s.btn}
            type="button"
            onClick={(e) => sortFaster(e.target.id)}
          >
            Самый быстрый
          </button>
        </div>
        <div className={s.btnWrapper}>
          <button
            id="optimal"
            className={moreSorted === 'optimal' ? x : s.btn}
            type="button"
            onClick={(e) => sortOptimal(e.target.id)}
          >
            Оптимальный
          </button>
        </div>
      </div>
    </header>
  )
}
function mapSate(state) {
  return {
    moreSorted: state.moreSorted,
  }
}
export default connect(mapSate, actions)(Header)
