import {ShipmentOptionsCardContainer} from "./shipment-options-card-styles.jsx";

const ShipmentOptionsCard = ({ icon, title, description, selected, onClick }) => {
  return (
    <ShipmentOptionsCardContainer
      onClick={onClick}
      selected={selected}
    >
        <i className={`fa ${icon}`}></i>
        <div>
          <h6>{title}</h6>
          <p>{description}</p>
        </div>
    </ShipmentOptionsCardContainer>
  );
};

export default ShipmentOptionsCard;