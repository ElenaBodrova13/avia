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
  isDone: false,
  error: null,
}

const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHECKBOX_TOGGLE':
      return {
        ...state,
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
        ticketsSort: state.tickets.filter((t) => {
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
        }),
      }
    case 'MORE_TICKETS':
      return { ...state, counter: state.counter + 5 }
    case 'REC_ID':
      return { ...state, gestId: action.payload.searchId }
    case 'REC_DONE':
      return { ...state, isDone: true }

    case 'FETCH_SUCCESS':
      return { ...state, tickets: [...state.tickets, ...action.payload] }

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
