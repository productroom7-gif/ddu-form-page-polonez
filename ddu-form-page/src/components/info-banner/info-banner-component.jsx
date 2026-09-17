import {InfoBannerContainer, InfoTitle} from './info-banner-component-styles.jsx';

const InfoBanner = ({title, description, icon}) => {
    return (
        <InfoBannerContainer>
            <InfoTitle>
                <i className={`fa ${icon}`} aria-hidden="true"></i>
                {title}
            </InfoTitle>
            <p>{description}</p>
        </InfoBannerContainer>
    )
}

export default InfoBanner;