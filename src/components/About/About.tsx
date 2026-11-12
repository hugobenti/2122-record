import AnimatePolvo from "../../assets/AnimatePolvo";
import ContactCta from "../ContactCta/ContactCta";
import SectionSeparator from "../Separator/SectionSeparator";
import { cx } from "../../utils/cx";
import { aboutStyle } from "./About.style";
import { useAbout } from "./useAbout";

const About = () => {
  const { aboutRef } = useAbout();
  return (
    <div id="about" className={aboutStyle.root} ref={aboutRef}>
      <section className={aboutStyle.introduction}>
        <div className={aboutStyle.padding}>
          <div className={aboutStyle.introContent}>
            <h2 className={aboutStyle.introHeading}>Conheça a 2122</h2>
            <p className={aboutStyle.introText}>
              A 2122 apoia artistas na construção de carreiras sólidas, unindo
              expertise em produção musical, direito e marketing. Oferecemos
              soluções completas que conectam música, estratégia e jurídico,
              pilares essenciais para viver de arte.
            </p>
            <p className={cx(aboutStyle.introText, aboutStyle.introNext)}>
              Trabalhamos lado a lado com os artistas, fornecendo suporte em
              todas as etapas, desde a produção até contratos e planejamento,
              com o propósito de transformar a paixão pela música em uma
              carreira sustentável.
            </p>
          </div>
        </div>
      </section>

      <div className={aboutStyle.separator}>
        <SectionSeparator
          bottomColor={aboutStyle.separatorBottom}
          topColor={aboutStyle.separatorTop}
        />
      </div>

      <section className={aboutStyle.mission}>
        <div className={aboutStyle.padding}>
          <div className={aboutStyle.grid}>
            <div className={aboutStyle.card}>
              <h3 className={aboutStyle.cardHeading}>
                Nossa missão
              </h3>
              <p className={aboutStyle.cardText}>
                Na 2122, nossa missão é tornar o sonho de artistas independentes
                uma realidade. Unimos paixão pela arte, conhecimento técnico e
                entendimento do mercado para oferecer serviços de alta qualidade e
                acessíveis. Como artistas que já enfrentaram os desafios da
                carreira independente, entendemos suas necessidades e trabalhamos
                com confiança e empatia para superar essas barreiras.
              </p>
            </div>

            {/* Card - O Que Fazemos */}
            <div className={aboutStyle.card}>
              <h3 className={aboutStyle.cardHeading}>
                O Que Fazemos
              </h3>
              <p className={aboutStyle.cardText}>
                Fundada por três artistas com formações em produção musical,
                direito e publicidade, a 2122 oferece suporte completo baseado em
                música, marketing e jurídico. Nosso propósito é permitir que{" "}
                <strong>você foque no que ama enquanto cuidamos do resto</strong>,
                garantindo uma carreira sólida e sustentável. Se deseja elevar sua
                trajetória artística, estamos prontos para fazer parte da sua
                história.
              </p>
            </div>

            <div className={aboutStyle.desktopAction}>
              <div className={aboutStyle.octopus}>
                <AnimatePolvo />
              </div>
              <ContactCta label="Fale com a gente" className={aboutStyle.desktopCta} />
            </div>
          </div>

          <div className={aboutStyle.mobileAction}>
            <ContactCta label="Fale com a gente" className={aboutStyle.mobileCta} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
