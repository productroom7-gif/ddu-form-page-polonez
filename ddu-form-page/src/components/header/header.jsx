import { useRef, useState } from 'react';
import meestLogo from '../../assets/img/meest-logo.svg';
import polonezLogo from '../../assets/img/polonez-logo.svg';
import { FlexContainer, HeaderEmail, LanguageSwitcher, LanguageEmoji, Dropdown } from '../../styles/global-styles';

const Header = ({ user, language, onLanguageChange }) => {
  const logo = user === 'polonez' ? polonezLogo : meestLogo;
  const contactEmail = user === 'polonez' ? 'info@polonezamerica.com' : 'info.usa@meest.com';
  const textRef = useRef();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const languages = [
    { code: 'en', name: 'English', label: 'EN', flag: '🇬🇧' },
    { code: 'pl', name: 'Polski', label: 'PL', flag: '🇵🇱' },
  ];
  const selectedLang = languages.find(l => l.code === language) || languages[0];
  const HeaderEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(textRef.current.innerText).catch(console.error);
  };
  return (
    <header><div className="container"><div className="row"><div className="col-lg-5 col-md-12 offset-lg-6 d-flex justify-content-between">
      <img src={logo} alt={`${user} logo`} className='contain-image header-logo' />
      <FlexContainer justifycontent='space-between' alignitems='center' gap='16px'>
        <HeaderEmail ref={textRef} onClick={HeaderEmailClick}><i className="fa-solid fa-envelope"></i>{contactEmail}</HeaderEmail>
        <LanguageSwitcher onClick={() => setShowLangDropdown(v => !v)}>
          <FlexContainer alignitems='center' gap='6px'><LanguageEmoji title={selectedLang.label}>{selectedLang.flag}</LanguageEmoji><p>{selectedLang.label}</p></FlexContainer>
          {showLangDropdown && <Dropdown>{languages.map(lang => <p key={lang.code} onClick={(e)=>{e.stopPropagation();onLanguageChange(lang.code);setShowLangDropdown(false);}}>{lang.label} - {lang.name}</p>)}</Dropdown>}
        </LanguageSwitcher>
      </FlexContainer>
    </div></div></div></header>
  );
};
export default Header;
