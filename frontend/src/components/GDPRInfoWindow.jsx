import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GDPRInfoWindow = ({ onClose }) => {
    const navigate = useNavigate();

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

    const redirectToSearch = () => {
        navigate('/search');
        onClose();
    }
 
    return (
        <div className='gdpr-container-outer'>
            <div className='gdpr-container-inner'>
                <h2>GDPR-information</h2>
                <p>
                Vi behöver spara och behandla personuppgifter om dig, så som: 
                Namn, Företag, Mejl samt Telefonnummer. 
                Syftet med en sådan behandling är för att kunna visa uppgifter för eventuella kunder i vår sökfunktion på vår hemsida Frilansen. 
                I samband med detta visas även kontaktuppgifter så som mejl och telefonnummer för att eventuella kunder ska kunna nå dig.
                </p>

                <p>
                Vi har fått dina uppgifter via registreringen av ditt konto. 
                Dina uppgifter går att redigera vid önskan eller behov. 
                De uppgifter vi behandlar anser vi vara nödvändiga för att kunna visa upp ditt företag på vår hemsida Frilansen, och om personuppgifter inte anges kan vi inte visa upp ditt företag. 
                Vi tillämpar vid var tid gällande integritetslagstiftning vid all behandling av personuppgifter. 
                Den rättsliga grunden för att behandla dina personuppgifter är samtycke. 
                Du har när som helst rätt att återkalla ditt samtycke till behandlingen. 
                Ett återkallande påverkar inte lagligheten av behandlingen innan samtycket återkallades. 
                Dina uppgifter kommer att sparas så länge du är en registrerad användare hos oss.
                </p>
                <p>
                De personuppgifter vi behandlar om dig delas med allmänheten. 
                Vi kan även komma att dela dina personuppgifter med en tredje part, förutsatt att vi är skyldiga att göra så enligt lag. 
                Däremot kommer vi aldrig att överföra dina uppgifter till ett land utanför EU.
                </p>
                <p>
                Personuppgiftsansvarig är [Namn, Adress]. Du har rätt att kontakta oss om du vill ha ut information om de uppgifter vi har om dig för att begära rättelse, överföring eller för att begära att vi begränsar behandlingen, för att göra invändningar eller begära radering av dina uppgifter. 
                Detta gör du enklast genom att kontakta oss på [Mail.mail@mail.se]. Du når vårt dataskyddsombud på [Mail.mail@mail.se].
                </p>
                <p>
                Om du har klagomål på vår behandling av dina personuppgifter har du rätt att inge klagomål till tillsynsmyndigheten Integritetsskydsmyndigheten, IMY.
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
                <button onClick={redirectToSearch}>
                    Stäng
                </button>
            </div>
        </div>
    )
}

export default GDPRInfoWindow;