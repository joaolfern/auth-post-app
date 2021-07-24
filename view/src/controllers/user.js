import { ErrInternetDisconnected, TimeoutError } from './errors'
import { API } from './index'

const userController = {
  create: async (body) => {
    try {
      const response = await fetch(`${API}/user/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (!response.ok) throw Error(data);
      return data
    } catch (err) {
      if (err?.name === 'ERR_INTERNET_DISCONNECTED') {
        throw new ErrInternetDisconnected()
      }
      throw err || new TimeoutError()
    }

  }
}

export default userController