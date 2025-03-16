function createCheckbox(label, idCheckbox) {
  return {
    label,
    idCheckbox,
    checked: true,
  }
}

const initialState = {
  checkboxes: [
    createCheckbox('Все', 'All'),
    createCheckbox('Без пересадок', 'Strate'),
    createCheckbox('1 пересадка', 'One'),
    createCheckbox('2 пересадки', 'Two'),
    createCheckbox('3 пересадки', 'Three'),
  ],
  ticketsSort: [],

  tickets: [],
  counter: 5,
  gestId: null,
  isStart: true,
  isDone: false,
  error: null,
  moreSorted: 'chip',
}

const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHECKBOX_TOGGLE':
      return {
        ...state,
        isStart: false,
        checkboxes: state.checkboxes.map((checkbox) => {
          if (action.id === 'All' && action.checked) {
            checkbox.checked = true
          }
          if (action.id === 'All' && !action.checked) {
            checkbox.checked = false
          }

          if (action.id !== 'All') {
            if (checkbox.idCheckbox === action.id) {
              checkbox.checked = action.checked
              if (!checkbox.checked) {
                state.checkboxes[0].checked = false
              }
              if (
                state.checkboxes[1].checked &&
                state.checkboxes[2].checked &&
                state.checkboxes[3].checked &&
                state.checkboxes[4].checked
              ) {
                state.checkboxes[0].checked = true
              }
            }
          }

          return checkbox
        }),
        ticketsSort: JSON.parse(
          JSON.stringify(
            state.tickets.filter((t) => {
              if (state.checkboxes[0].checked) {
                return t
              }
              if (state.checkboxes[1].checked) {
                return t.segments[0].stops.length === 0 && t.segments[1].stops.length === 0
              }
              if (state.checkboxes[2].checked) {
                return t.segments[0].stops.length === 1 && t.segments[1].stops.length === 1
              }
              if (state.checkboxes[3].checked) {
                return t.segments[0].stops.length === 2 && t.segments[1].stops.length === 2
              }
              if (state.checkboxes[4].checked) {
                return t.segments[0].stops.length === 3 && t.segments[1].stops.length === 3
              }

              return t
            })
          )
        )

          .sort((a, b) => {
            if (state.moreSorted === 'chip') {
              return a.price - b.price
            }
            if (state.moreSorted === 'fast') {
              return a.segments[0].duration - b.segments[0].duration
            }
            if (state.moreSorted === 'optimal') {
              return a.new - b.new
            }
            return a - b
          }),
      }
    case 'SORT_OPTIMAL':
      return {
        ...state,
        ticketsSort: JSON.parse(JSON.stringify(state.ticketsSort))
          .map((t) => {
            t.new = t.price + t.segments[0].duration * 15
            return t
          })
          .sort((a, b) => a.new - b.new),

        moreSorted: action.payload,
      }
    case 'SORT_CHIP':
      return {
        ...state,
        ticketsSort: JSON.parse(JSON.stringify(state.ticketsSort)).sort((a, b) => a.price - b.price),
        moreSorted: action.payload,
      }
    case 'SORT_FASTER':
      return {
        ...state,
        ticketsSort: JSON.parse(JSON.stringify(state.ticketsSort)).sort(
          (a, b) => a.segments[0].duration - b.segments[0].duration
        ),
        moreSorted: action.payload,
      }
    case 'MORE_TICKETS':
      return { ...state, counter: state.counter + 5 }
    case 'REC_ID':
      return { ...state, gestId: action.payload.searchId }
    case 'REC_DONE':
      return { ...state, isDone: true }

    case 'FETCH_SUCCESS':
      return { ...state, tickets: [...state.tickets, ...action.payload] }
    case 'INISHIAL_TICKETS':
      return {
        ...state,
        tickets: action.payload.sort((a, b) => {
          if (state.moreSorted === 'chip') {
            return a.price - b.price
          }
          if (state.moreSorted === 'fast') {
            return a.segments[0].duration - b.segments[0].duration
          }
          if (state.moreSorted === 'optimal') {
            return a.new - b.new
          }
          return a - b
        }),
      }
    case 'REQ_TICKETS_ERROR':
      return {
        ...state,

        error: action.payload,
      }

    default:
      return state
  }
}

export default rootReducer
