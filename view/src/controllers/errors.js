
export class ErrInternetDisconnected extends Error {
  name = 'ERR_INTERNET_DISCONNECTED';
  message = 'Verifique sua conexão com a internet';
}

export class ConnectionFailed extends Error {
  name = 'CONNECTION_FAILED';
  message = 'Por favor, tente novamente mais tarde';
}

export class TimeoutError extends Error {
  name = 'ERR_TIMEOUT'
  message = 'Por favor, tente novamente mais tarde'
}

export class CustomError extends Error {
  name = 'ERR'
  constructor(message) {
    super()
    this.message = message
  }
}
