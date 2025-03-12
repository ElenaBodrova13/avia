import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import s from './checkbox.module.css'

function Checkbox({ id, label, checked, checkItem }) {
  return (
    <div className={s.checkboxWrapper}>
      <label htmlFor={id} className={s.label}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            checkItem(e.target.checked, id)
          }}
        />
        <span className={s.span}>{label}</span>
      </label>
    </div>
  )
}

function mapSate(state) {
  return { isCheckedAll: state.isCheckedAll }
}

export default connect(mapSate, actions)(Checkbox)
