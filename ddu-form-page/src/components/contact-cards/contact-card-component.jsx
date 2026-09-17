import { ContactCardTitle, ContactCardBody, ContactCardHolder } from "./contact-card-component-styles.jsx";


const ContactCard = ({icon, title, descriptionTitle, description}) => {
    return (
        <>
           <ContactCardHolder>
             <ContactCardTitle>
                <i className={`fa ${icon}`} aria-hidden="true"></i>
                {title}
            </ContactCardTitle>
            <ContactCardBody>
                <h6>{descriptionTitle}</h6>
                <p>{description}</p>
            </ContactCardBody>
           </ContactCardHolder>
        </>
    )
}

export default ContactCard;