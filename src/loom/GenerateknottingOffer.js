import React, { useState } from 'react';
import '../common/static/css/generate_knotting_offer.css';
import { toast } from 'react-toastify';
const GenerateknottingOffer = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [reed, setReed] = useState('');
  const [draft, setDraft] = useState('');
  const [reedSpace, setReedSpace] = useState('');
  const [numberOfLooms, setNumberOfLooms] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [jobRateRequired, setJobRateRequired] = useState('');
  const [designPaper, setDesignPaper] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleSubmit = () => {if (reed &&
    draft &&
    reedSpace &&
    numberOfLooms &&
    availableFrom &&
    jobRateRequired) {
    
      const formdata = new FormData();
      formdata.append("Reed", reed);
      formdata.append("Draft", draft);
      formdata.append("ReedSpace", reedSpace);
      formdata.append("NoofLooms", numberOfLooms);
      formdata.append("AvailableFrom", availableFrom);
      formdata.append("JobRateRequired", jobRateRequired);
      formdata.append("DesignPaper", designPaper);
      formdata.append("LoomId", user.Id);
      
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };
      
      fetch("https://textileapp.microtechsolutions.co.in/php/postknottingoffer.php", requestOptions)
        .then((response) => response.text())
        .then((result) => {//console.log(result)
          toast.success('Offer added')
          setReed('');
          setDraft('');
          setReedSpace('');
          setNumberOfLooms('');
          setAvailableFrom('');
          setJobRateRequired('');
          setDesignPaper(null);
          setFileName('');
        })
        .catch((error) => console.error(error));
  
  } else {
    toast.error('Enter all the * fields') 
  }
  
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
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Reed <span style={{ color: "red" }}>*</span></label>
            <input required
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Enter Reed'
              type='text'
              value={reed}
              onChange={(e) => setReed(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Draft <span style={{ color: "red" }}>*</span></label>
            <input required
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
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Reed space (RS) <span style={{ color: "red" }}>*</span></label>
            <input 
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Reed space (RS)'
              type='text'
              value={reedSpace}
              onChange={(e) => setReedSpace(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Number of Looms <span style={{ color: "red" }}>*</span></label>
            <input required
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Number of Looms'
              type='number'
              value={numberOfLooms}
              onChange={(e) => setNumberOfLooms(e.target.value)}
            />
          </div>

        </div>


        <div className='knotting_offer_form' >
          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Available From <span style={{ color: "red" }}>*</span></label>
            <input required
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Number of Looms'
              type='Date'
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '13px' }}>
            <label style={{ fontWeight: 'bold', margin: "10px" }}>Job Rate Required <span style={{ color: "red" }}>*</span></label>
            <input required
              style={{ width: '90%', margin: "10px", border: '1px solid var(--primary-color)' }}
              placeholder='Job Rate Required'
              type='number'
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


