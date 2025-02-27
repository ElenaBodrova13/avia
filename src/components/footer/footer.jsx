import React from 'react'

import s from './footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.btnWrapper}>
        <button className={s.btn} type="button">
          Показать еще 5 билетов!
        </button>
      </div>
    </footer>
  )
}
