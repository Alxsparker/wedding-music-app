import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@mui/material';

const QRCodeGenerator = ({ url }) => {
  const downloadQRCode = () => {
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'event_qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <QRCodeCanvas id="qrcode" value={url} size={256} />
      <Button variant="contained" color="primary" onClick={downloadQRCode}>
        Télécharger QR Code
      </Button>
    </div>
  );
};

export default QRCodeGenerator;
