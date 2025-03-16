import FetchServise from './fetchServise'

const f = new FetchServise()

export const moreTickets = () => ({ type: 'MORE_TICKETS' })

export const checkItem = (checked, id) => ({
  type: 'CHECKBOX_TOGGLE',
  checked,
  id,
})

export const sortChip = (id) => ({ type: 'SORT_CHIP', payload: id })
export const sortFaster = (id) => ({ type: 'SORT_FASTER', payload: id })
export const sortOptimal = (id) => ({ type: 'SORT_OPTIMAL', payload: id })
export const fetchSuccess = (tickets) => ({
  type: 'FETCH_SUCCESS',
  payload: tickets,
})

export const recordId = (id) => ({ type: 'REC_ID', payload: id })

export const reqTicketsDone = () => ({ type: 'REC_DONE' })

export const getInitialTickets = (tickets) => ({ type: 'INISHIAL_TICKETS', payload: tickets })

export const reqTicketsError = (e) => ({
  type: 'REQ_TICKETS_ERROR',
  payload: e,
})

export const getAllTickets = () => async (dispatch, getState) => {
  try {
    if (!getState().gestId) {
      const gestId = await f.getGestId()
      dispatch(recordId(gestId))
    }

    const response = await f.fetchAllTickets(getState().gestId)
    if (response.ok) {
      const data = await response.json()
      const tickets = data.tickets.map((t) => ({ ...t, new: t.price + t.segments[0].duration * 15 }))

      dispatch(fetchSuccess(tickets))

      if (getState().tickets.length > 9000) {
        dispatch(reqTicketsDone())
      } else {
        dispatch(getAllTickets())
      }
    } else {
      if (response.status === 404) {
        throw new Error('404, Not found')
      }

      if (response.status === 500) {
        dispatch(getAllTickets())
        throw new Error('500')
      }

      // For any other server error
      throw new Error(response.status)
    }
  } catch (e) {
    console.error(`Произошла ошибка ${e.message}`)
    dispatch(reqTicketsError(e))
  }
}
