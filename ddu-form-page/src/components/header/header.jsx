import { useRef, useState } from 'react';
import meestLogo from '../../assets/img/meest-logo.svg';
import polonezLogo from '../../assets/img/polonez-logo.svg';
import { FlexContainer, HeaderEmail, LanguageSwitcher, LanguageEmoji, Dropdown } from '../../styles/global-styles';

const Header = ({ user }) => {
  const logo = user === 'polonez' ? polonezLogo : meestLogo;
  const contactEmail = user === 'polonez' ? 'info@polonezamerica.com' : 'info.usa@meest.com';
  const textRef = useRef();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    name: 'Українська',
    label: 'UK',
    flag: '🇺🇦'
  });

   const languages = [
    { name: 'Українська', label: 'UK', flag: '🇺🇦' },
    { name: 'Polski', label: 'PL', flag: '🇵🇱' },
  ];

   const handleSelect = (lang) => {
    setSelectedLang(lang);
    setShowLangDropdown(false);
  };

  const HeaderEmailClick = (e) => {
    e.preventDefault();
    const text = textRef.current.innerText;
    navigator.clipboard.writeText(text).catch(err => {
      console.error("Failed to copy: ", err);
    });
  }

  return (
    <header>
      <div className="container">
        <div className="row">
            <div className="col-lg-5 col-md-12 offset-lg-6 d-flex justify-content-between">
                <img src={logo} alt={`${user} logo`} className='contain-image header-logo' />

                <FlexContainer justifycontent='space-between' alignitems='center' gap='16px'>
                  <HeaderEmail ref={textRef} onClick={HeaderEmailClick}>
                    <i>
                      <svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L227.3 285.8c16.9 12.4 40.5 12.4 57.4 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16h384c8.8 0 16-7.2 16-16V212.2L322.7 322.5c-38.6 28.3-91.1 28.3-129.7 0L48 212.2zM0 128C0 92.7 28.7 64 64 64h384c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
                      </svg>
                    </i>
                    {contactEmail}
                  </HeaderEmail>
                   <LanguageSwitcher onClick={(show) => setShowLangDropdown(show => !show)}>
                    <FlexContainer alignitems='center' gap='6px'>
                      <LanguageEmoji title={selectedLang.label}>{selectedLang.flag}</LanguageEmoji>
                      <p>{selectedLang.label}</p>
                    </FlexContainer>

                    {showLangDropdown && (
                      <Dropdown>
                        {languages.map(lang => (
                          <p
                            key={lang.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelect(lang);
                            }}
                          >
                            {lang.label} - {lang.name}
                          </p>
                        ))}
                      </Dropdown>
                    )}
                  </LanguageSwitcher>
                </FlexContainer>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;