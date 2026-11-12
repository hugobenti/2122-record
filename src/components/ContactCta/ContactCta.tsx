import { cx } from '../../utils/cx';
import { INSTAGRAM_DM_URL } from './ContactCta.data';
import { contactCta } from './ContactCta.style';
import { IContactCtaProps } from './ContactCta.type';

const ContactCta = ({ label, className }: IContactCtaProps) => (
  <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className={cx(contactCta.base, className)}>
    {label}<span aria-hidden="true" className={contactCta.externalCue}>↗</span><span className={contactCta.screenReader}> (abre o Instagram em nova aba)</span>
  </a>
);

export default ContactCta;
