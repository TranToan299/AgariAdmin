export type IWebcontent = {
  id: number;
  type: WebcontentType;
  content: string;
};

export enum WebcontentType {
  Home = 'home',
  About = 'about',
  Carrers = 'carrers',
  Contact = 'contact',
  Footer = 'footer',
  Logo = 'logo',
  Service = 'service',
}
