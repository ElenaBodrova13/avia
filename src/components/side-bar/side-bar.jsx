import React from 'react'
import { connect } from 'react-redux'

import Checkbox from '../checkbox'
import * as actions from '../../actions'

import s from './side-bar.module.css'

function SideBar({ checkboxes }) {
  const element = checkboxes.map((item) => (
    <Checkbox label={item.label} id={item.idCheckbox} checked={item.checked} key={item.idCheckbox} />
  ))
  return (
    <div className={s.sidebar}>
      <p>Количество пересадок</p>
      {element}
    </div>
  )
}

function mapSate(state) {
  return {
    checkboxes: state.checkboxes,
    isCheckedAll: state.isCheckedAll,
  }
}

export default connect(mapSate, actions)(SideBar)
