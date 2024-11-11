import React, { useEffect, useState } from 'react';

const GDPRInfoWindow = ({ onClose }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const GDPRaccepted = localStorage.getItem('gdprAccepted');
        if (GDPRaccepted) {
            onClose();
        }
    }, [onClose]);

    const handleAccept = () => {
        localStorage.setItem('gdprAccepted', 'true');
        onClose();
    };

    const handleCheckboxCheck = (e) => {
        setIsChecked(e.target.checked);
    };
 
    return (
        <div className='gdpr-container-outer'>
            <div className='gdpr-container-inner'>
                <h2>GDPR-information</h2>
                <p>
                    Vi använder kakor bla bla bla
                </p>
                <div className='gdpr-checkbox'>
                    <input
                        type="checkbox"
                        id="gdprCheckbox"
                        checked={isChecked}
                        onChange={handleCheckboxCheck}
                    />
                    <label htmlFor="gdprCheckbox">Jag godkänner villkoren</label>
                </div>
                <button onClick={handleAccept} className='gdpr-button' disabled={!isChecked}>
                    Acceptera
                </button>
            </div>
        </div>
    )
}

export default GDPRInfoWindow;