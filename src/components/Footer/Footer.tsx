import { cx } from '../../utils/cx';
import { footerEmail, socialLinks } from './Footer.data';
import { footerStyle } from './Footer.style';
import { useFooter } from './useFooter';

const Footer = () => {
  const { year } = useFooter();

  return (
    <footer className={footerStyle.root}>
      <div className={footerStyle.container}>
        <div className={footerStyle.columns}>
          <div className={footerStyle.company}>
            <h2 className={footerStyle.companyHeading}>2122 Produções</h2>
            <p className={footerStyle.email}>Email: <a href={`mailto:${footerEmail}`} className={cx(footerStyle.link, footerStyle.emailLink)}>{footerEmail}</a></p>
          </div>
          <div>
            <h3 className={footerStyle.heading}>Siga-nos</h3>
            <ul className={footerStyle.socialList}>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={footerStyle.link}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={footerStyle.copyright}>
          <p className={footerStyle.copyrightText}>© {year} - 2122 Produções. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
