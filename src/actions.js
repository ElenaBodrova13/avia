import FetchServise from './fetchServise'

const f = new FetchServise()

export const moreTickets = () => ({ type: 'MORE_TICKETS' })

export const checkItem = (checked, id) => ({
  type: 'CHECKBOX_TOGGLE',
  checked,
  id,
})

export const fetchSuccess = (tickets) => ({
  type: 'FETCH_SUCCESS',
  payload: tickets,
})

export const recordId = (id) => ({ type: 'REC_ID', payload: id })

export const reqTicketsDone = () => ({ type: 'REC_DONE' })

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

      dispatch(fetchSuccess(data.tickets))

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
