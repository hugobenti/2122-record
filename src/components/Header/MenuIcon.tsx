import { cx } from '../../utils/cx';
import { menuIcon } from './MenuIcon.style';

const MenuIcon = () => (
  <span aria-hidden="true" className={cx(menuIcon.base)}>
    <span className={cx(menuIcon.stroke)} />
    <span className={cx(menuIcon.stroke)} />
    <span className={cx(menuIcon.stroke)} />
  </span>
);

export default MenuIcon;
