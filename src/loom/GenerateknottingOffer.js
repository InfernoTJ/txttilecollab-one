import React, { useState } from 'react';
import '../common/static/css/generate_knotting_offer.css';
const GenerateknottingOffer = () => {
  const [reed, setReed] = useState('');
  const [draft, setDraft] = useState('');
  const [reedSpace, setReedSpace] = useState('');
  const [numberOfLooms, setNumberOfLooms] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [jobRateRequired, setJobRateRequired] = useState('');
  const [designPaper, setDesignPaper] = useState(null);
  const [fileName, setFileName] = useState('');
  const handleSubmit = () => {

    setReed('');
    setDraft('');
    setReedSpace('');
    setNumberOfLooms('');
    setAvailableFrom('');
    setJobRateRequired('');
    setDesignPaper(null);
    setFileName('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDesignPaper(file);
    setFileName(file ? file.name : '');
  };


  return (
    <div className='kotting-offer-container'  >
      <div>
        <h1 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Loom Knotting Offers</h1>
      </div>

      <div style={{padding:'40px 0'}} className='knotting_offer_form-all'>
        <div className='knotting_offer_form'>
          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Reed</label>
            <input
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Enter Reed'
              type='text'
              value={reed}
              onChange={(e) => setReed(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Draft</label>
            <input
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Enter Draft'
              type='text'
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          </div>


        </div>


        <div className='knotting_offer_form'>
          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Reed space (RS)</label>
            <input
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Reed space (RS)'
              type='text'
              value={reedSpace}
              onChange={(e) => setReedSpace(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Number of Looms</label>
            <input
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Number of Looms'
              type='text'
              value={numberOfLooms}
              onChange={(e) => setNumberOfLooms(e.target.value)}
            />
          </div>

        </div>


        <div className='knotting_offer_form' >
          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Available From</label>
            <input
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Number of Looms'
              type='Date'
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Job Rate Required</label>
            <input
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Job Rate Required'
              type='text'
              value={jobRateRequired}
              onChange={(e) => setJobRateRequired(e.target.value)}
            />
          </div>

        </div>
        <div className='knotting-btns'>


        <div className='file-upload-section'>
            <input
              type='file'
              id='uploadDesignPaper'
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button className='btn1' onClick={() => document.getElementById('uploadDesignPaper').click()}>
              Upload Design Paper (Optional)
            </button>
            {fileName && <p className='file-name'>{fileName}</p>}
          </div>

          <div>
            <button className='btn2' onClick={handleSubmit}>Submit</button>
          </div>

        </div>
      </div>


    </div>
  )
}

export default GenerateknottingOffer;


