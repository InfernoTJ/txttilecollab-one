import React from 'react'
import '../common/static/css/myloom.css'
import { useNavigate } from 'react-router-dom';

const Myloom = () => {
    const navigate = useNavigate();
    const handleMyloomcardClick = () => {
      navigate('/sidebar/myloomdetails');
    };
    return (
        <div className='profile-my_loom'>
            <div>
                <h2 style={{ color: 'var(--primary-color)',textAlign:'center' }}>List of My Looms</h2>
            </div>
            <div className='my_loom-container' style={{ height: '80vh', display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(5,1fr)', gap: '20px'}}>
                <div onClick={handleMyloomcardClick} className='myloom-card' >1
                    <p>Loom No: P-2002</p>
                    
                </div>
                <div className='myloom-card' >2</div>
                <div className='myloom-card' >3</div>
                <div className='myloom-card' >4</div>
                <div className='myloom-card' >5</div>
                <div className='myloom-card' >6</div>
                <div className='myloom-card' >7</div>
                <div className='myloom-card' >8</div>
                <div className='myloom-card' >9</div>
             
             
         

            </div>
        </div>
    )
}

export default Myloom



