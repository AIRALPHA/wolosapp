import { useState } from 'react'

const { ipcRenderer } = window.require('electron')

function SendMessage() {
  const [message, setMessage] = useState('237655625509')
  const [number, setNumber] = useState('')

  const sendMessage = () => {
    ipcRenderer.send('send-message', {
      number,
      message
    })
    setMessage('')
  }

  return (
    <div className="container">
      <input
        type="text"
        value={number}
        placeholder="237697456833"
        onChange={(e) => setNumber(e.target.value)}
      />
      <textarea onChange={(e) => setMessage(e.target.value)} value={message} />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  )
}

export default SendMessage
