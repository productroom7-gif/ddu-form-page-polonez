import OdooLogo from '../../assets/img/odoo_logo_tiny.png';
import user from '../../config';


const Footer = () => {
    const companyName = user === 'polonez' ? 'Polonez America' : 'Meest Group';
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1 col-md-12 d-flex justify-content-center footer-col">
                        <div className="copyright">
                            <p>© 2025 - {companyName} - Postal & Transport Services. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;