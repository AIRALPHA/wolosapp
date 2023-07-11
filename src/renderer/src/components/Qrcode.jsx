import { QRCodeSVG } from 'qrcode.react'

function Qrcode({ value }) {
  return <QRCodeSVG value={value} size={500} />
}

export default Qrcode
