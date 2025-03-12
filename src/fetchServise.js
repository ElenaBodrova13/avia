export default class FetchServise {
  getGestId = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }

    const result = await fetch('https://aviasales-test-api.kata.academy/search', options)
    const data = await result.json()
    return data
  }

  fetchAllTickets = async (id) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`, options)

    return res
  }
}
