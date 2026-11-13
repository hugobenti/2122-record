import { Link } from 'react-router-dom';
import { cx } from '../../utils/cx';
import useHeader from './useHeader';
import MenuIcon from './MenuIcon';
import { header } from './Header.style';

const Header = () => {
  const { isOpen, toggle, close, toggleRef, items, onHomeClick } = useHeader();

  return (
    <header className={cx(header.base)}>
      <div className={cx(header.surface)}>
        <div className={cx(header.bar)}>
          <nav aria-label="Menu principal" className={cx(header.desktop)}>
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={item.isCurrent ? 'page' : undefined}
                className={cx(header.desktopLink, item.isCurrent ? header.desktopCurrent : header.desktopIdle)}
                onClick={item.to === '/' ? onHomeClick : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            ref={toggleRef}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            className={cx(header.toggle)}
            onClick={toggle}
          >
            <MenuIcon />
          </button>
          {isOpen && (
            <nav id="menu-mobile" aria-label="Menu mobile" className={cx(header.mobile)}>
              {items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={item.isCurrent ? 'page' : undefined}
                  className={cx(header.mobileLink, item.isCurrent ? header.mobileCurrent : header.mobileIdle)}
                  onClick={item.to === '/' ? onHomeClick : close}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          <Link to="/" className={cx(header.title)} onClick={onHomeClick}>
            2122
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
