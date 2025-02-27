import React from 'react'

import s from './header.module.css'

export default function Header() {
  return (
    <header>
      <div className={s.header}>
        <div className={s.btnWrapper}>
          <button className={s.btn} type="button">
            Самый дешевый
          </button>
        </div>
        <div className={s.btnWrapper}>
          <button className={s.btn} type="button">
            Самый быстрый
          </button>
        </div>
        <div className={s.btnWrapper}>
          <button className={s.btn} type="button">
            Оптимальный
          </button>
        </div>
      </div>
    </header>
  )
}
