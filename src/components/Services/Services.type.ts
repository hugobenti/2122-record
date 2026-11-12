export interface IServiceBullet {
  term: string;
  rest: string;
}

export interface IService {
  id: string;
  title: string;
  intro: string;
  detailsIntro: string;
  bullets: IServiceBullet[];
  closing: string;
  ctaLabel: string;
}
