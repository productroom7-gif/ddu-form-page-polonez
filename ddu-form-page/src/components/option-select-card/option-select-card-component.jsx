import {OptionCardContainer} from "./option-select-card-component-styles.jsx";

const OptionCard = ({title, description, icon, checked, onChange, selected }) => {
    return (
        <OptionCardContainer onClick={onChange} selected={selected}>
            <i className={`fa ${icon}`}></i>
            <div>
                <p>{title}</p>
                <span>{description}</span>
                <input 
                type="checkbox" 
                checked={checked} 
                onChange={onChange} 
                />
            </div>
        </OptionCardContainer>
    )
}

export default OptionCard;