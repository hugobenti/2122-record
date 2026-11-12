import { IService } from './Services.type';

export const services: IService[] = [
  {
    id: 'servico-musicas-detalhes',
    title: 'Músicas',
    intro: 'Criar música é mais do que uma paixão; é uma jornada que exige dedicação e técnica. Na 2122, entendemos que o amor pela arte deve ser acompanhado das ferramentas certas para transformar ideias em obras de alta qualidade.',
    detailsIntro: 'Oferecemos um suporte completo para cada etapa da produção musical:',
    bullets: [
      { term: 'Definição de conceito', rest: ' para alinhar sua identidade artística;' },
      { term: 'Composição lírica', rest: ' que transmite emoção e autenticidade;' },
      { term: 'Captação de voz', rest: ' e instrumentos com excelência técnica;' },
      { term: 'Mixagem e masterização', rest: ' para garantir que sua música tenha o impacto sonoro necessário para se destacar.' },
    ],
    closing: 'Com um olhar atento às necessidades dos artistas independentes, nossos serviços unem qualidade técnica a preços justos, porque sabemos o quanto é desafiador equilibrar sonhos e orçamento.',
    ctaLabel: 'Falar sobre música',
  },
  {
    id: 'servico-marketing-detalhes',
    title: 'Marketing',
    intro: 'Ter uma música incrível não basta para conquistar o público. Em um mercado saturado, o marketing é o que conecta sua arte às pessoas certas.',
    detailsIntro: 'Na 2122, entendemos que cada artista precisa de uma estratégia personalizada para alcançar seus objetivos. Por isso, oferecemos:',
    bullets: [
      { term: 'Planejamento estratégico', rest: ', com definição de público-alvo e cronograma de postagens;' },
      { term: 'Gestão de tráfego pago', rest: ', garantindo que sua música alcance ouvintes potenciais;' },
      { term: 'Criação de artes e vídeos', rest: ', que refletem sua identidade visual e destacam seu trabalho;' },
      { term: 'Contato com criadores de conteúdo e curadores', rest: ', ampliando sua rede e alcance.' },
    ],
    closing: 'Com as práticas certas e uma execução consistente, o marketing digital pode transformar artistas independentes em referências reconhecidas em seus nichos.',
    ctaLabel: 'Falar sobre marketing',
  },
  {
    id: 'servico-juridico-detalhes',
    title: 'Jurídico',
    intro: 'A proteção legal é fundamental para que sua arte seja valorizada e respeitada. Na 2122, oferecemos suporte jurídico especializado para artistas independentes.',
    detailsIntro: 'Oferecemos serviços essenciais para artistas independentes:',
    bullets: [
      { term: 'Registro de obras', rest: ' na Biblioteca Nacional;' },
      { term: 'Contratos de cessão de direitos', rest: ' para colaborações;' },
      { term: 'Proteção de marca', rest: ' e identidade artística;' },
      { term: 'Assessoria em negociações', rest: ' com gravadoras e plataformas.' },
    ],
    closing: 'Com o suporte jurídico adequado, você pode focar na criação sem se preocupar com questões legais que podem comprometer sua carreira.',
    ctaLabel: 'Falar sobre jurídico',
  },
];
