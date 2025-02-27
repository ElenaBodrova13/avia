import React from 'react'

import s from './side-bar.module.css'

export default function SideBar() {
  return (
    <div className={s.sidebar}>
      <p>Количество пересадок</p>

      <div className={s.checkbox}>
        <input className={s.check} type="checkbox" id="all" name="all" checked />

        <span> Все</span>
      </div>
      <div className={s.checkbox}>
        <input className={s.check} type="checkbox" id="straight" name="straight" />
        <span>Без пересадок</span>
      </div>
      <div className={s.checkbox}>
        <input className={s.check} type="checkbox" id="straight" name="one" />
        <span>1 пересадка</span>
      </div>
      <div className={s.checkbox}>
        <input className={s.check} type="checkbox" id="straight" name="two" />
        <span>2 пересадки</span>
      </div>
      <div className={s.checkbox}>
        <input className={s.check} type="checkbox" id="straight" name="three" />
        <span>3 пересадки</span>
      </div>
    </div>
  )
}
