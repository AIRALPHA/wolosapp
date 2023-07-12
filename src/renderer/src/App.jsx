import Qrcode from './components/Qrcode'
import { useEffect, useState } from 'react'
import SendMessage from './components/SendMessage'
const { ipcRenderer } = window.require('electron')

export const sendData = (data) => {
  ipcRenderer.send('send-data-event-name', JSON.stringify(data))
}

function App() {
  const [qr, setQr] = useState('')
  const [step, setStep] = useState('qr-code')

  useEffect(() => {
    // Listen for the event
    ipcRenderer.on('qr-code', (event, arg) => {
      setStep('qr-code')
      setQr(arg)
    })
    ipcRenderer.on('client-ready', () => {
      setStep('client-ready')
      setQr('')
    })
    // Clean the listener after the component is dismounted
    return () => {
      ipcRenderer.removeAllListeners()
    }
  }, [])

  return (
    <div className="container">
      {qr === '' && step !== 'client-ready' && <h1>Loading...</h1>}
      {step === 'qr-code' && qr !== '' && <Qrcode value={qr} />}
      {step === 'client-ready' && <SendMessage />}
    </div>
  )
}

export default App
