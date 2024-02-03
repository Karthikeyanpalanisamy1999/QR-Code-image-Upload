import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  const store = (e) => {
    e.preventDefault();
    
    if (image) {
      // Convert image data to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('img', reader.result);
      };
      reader.readAsDataURL(image);
      window.location.reload();
    }
  };

  let storedImage = localStorage.getItem('img') || '';

  return (
    <div className="ms-5 mt-5">
      <h1>QR Code Generator</h1>
      <div>
        <label className='mt-5'>Enter URL</label>
        <input type='text' placeholder='Enter url' onChange={(e) => setUrl(e.target.value)} value={url}/>
        <a className='margin' download>{url && <QRCode value={url} />}</a><br></br>
      </div>
      <div className='mt-5'>
        <form onSubmit={store}>
          <label>Upload:</label>
          <input type='file' onChange={(e) => setImage(e.target.files[0])} accept='image/*'></input>
          <button className='btn btn-success'>Upload</button>
        </form>
        <div className='mt-5'>
          {storedImage && <img src={storedImage} width={100} height={100} alt="Uploaded Img" />}
        </div>
      </div>
    </div>
  );
}

export default App;
