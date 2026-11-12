import ContactCta from '../ContactCta/ContactCta';
import { services } from './Services.data';
import { servicesStyle } from './Services.style';
import { useServices } from './useServices';

const Services = () => {
  const { expanded, sectionRefs, toggle } = useServices();

  return (
    <div id="services" className={servicesStyle.root}>
      <div className={servicesStyle.container}>
        <h1 className={servicesStyle.heading}>Serviços</h1>
        {services.map((service, index) => (
          <section key={service.id} ref={sectionRefs[index]} className={servicesStyle.service}>
            <h2 className={servicesStyle.title}>{service.title}</h2>
            <p className={servicesStyle.intro}>{service.intro}</p>
            <button
              type="button"
              className={servicesStyle.toggle}
              aria-expanded={expanded[index]}
              aria-controls={service.id}
              onClick={() => toggle(index)}
            >
              {expanded[index] ? 'Leia menos' : 'Leia mais'}
            </button>
            <div id={service.id} role="region" aria-label={service.title} hidden={!expanded[index]} className={servicesStyle.panel}>
              {expanded[index] && (
                <>
                  <p className={servicesStyle.detailsIntro}>{service.detailsIntro}</p>
                  <ul className={servicesStyle.list}>
                    {service.bullets.map((bullet) => (
                      <li key={bullet.term} className={servicesStyle.bullet}>
                        <strong>• {bullet.term}</strong>{bullet.rest}
                      </li>
                    ))}
                  </ul>
                  <p className={servicesStyle.closing}>{service.closing}</p>
                </>
              )}
            </div>
            <ContactCta label={service.ctaLabel} className={servicesStyle.serviceCta} />
          </section>
        ))}
        <div className={servicesStyle.endCta}>
          <ContactCta label="Fale com a gente" />
        </div>
      </div>
    </div>
  );
};

export default Services;
