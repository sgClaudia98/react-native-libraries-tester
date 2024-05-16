export interface Estat {
  actiu: boolean;
  id: number;
}

export interface Durada {
  text: string;
  milisegons: number;
}

export interface DataEmissio {
  text: string;
  utc: string;
}

export interface DataCaducitat {
  text: string;
  utc: string;
}

export interface Tematica {
  text: string;
  id: string;
}

export interface Temporada {
  idName: string;
  name: string;
  id: number;
}

export interface CodiEtic {
  text: string;
  id: string;
}

export interface Informacio {
  estat: Estat;
  id: number;
  op: number;
  aspectratio: string;
  programa_id: number;
  capitol: number;
  titol: string;
  titol_complet: string;
  slug: string;
  programa: string;
  permalink: string;
  tipus_contingut: string;
  descripcio: string;
  durada: Durada;
  data_emissio: DataEmissio;
  data_caducitat: DataCaducitat;
  tematica: Tematica;
  temporada: Temporada;
  codi_etic: CodiEtic;
  drets: {
    text: string;
  };
}

export interface Url {
  file: string;
  label: string;
  active: boolean;
}

export interface Media {
  geo: string;
  format: string;
  url: Url[];
}

export interface Idioma {
  id: string;
  desc: string;
  main: boolean;
}

export interface Subtitol {
  text: string;
  iso: string;
  url: string;
  format: string;
}

export interface Sprite {
  file: string;
}

export interface Imatge {
  amplada: number;
  alcada: number;
  url: string;
}

export interface Keyframe {
  realname: string;
  label: string;
  url: string;
}

export interface ScheduleItem {
  offset: string | number;
  skipoffset: number;
  tag: string;
}

export interface Vast {
  client: string;
  schedule: Record<string, ScheduleItem>;
}

export interface Publicitat {
  vast: Vast;
  events: {
    adError: {
      ad_tag_empty: string;
    };
  };
}

export interface SiteCatalyst {
  compte: string;
  nom: string;
  durada: number;
  reproductor: string;
  directe: number;
  tipus: string;
  parametres: Record<string, any>;
}

export interface Urls {
  sendmark: string;
  senduserdata: string;
  checkcors: string;
  gettime: string;
  senduserchannels: string;
}

export interface Matr {
  urls: Urls;
  parametres: Record<string, any>;
}

export interface Kantarst {
  customerC2: number;
  directe: number;
  mediaType: string;
  nom: string;
  parametres: Record<string, any>;
}

export interface Youbora {
  active: boolean;
  debug: boolean;
  opcions: Record<string, any>;
}

export interface Relacionats {
  url: string;
}

export interface Recomanats {
  url: string;
}
export interface AdobeAnalytics {
  id: string;
  mediaType: string;
  'op-capitol': string;
  compte: string;
  nom: string;
  durada: number;
  reproductor: string;
  directe: boolean;
  tipus: string;
  parametres: {
    [key: string]: string | number;
  };
}

export interface Audiencies {
  sitecatalyst?: SiteCatalyst;
  matr?: Matr;
  kantarst?: Kantarst;
  adobe_analytics?: AdobeAnalytics;
}

export interface ApiMediaCCMA {
  informacio: Informacio;
  media: Media;
  idiomes: Idioma[];
  subtitols: Subtitol[];
  sprites: Sprite;
  imatges: Imatge;
  keyframes: Keyframe[];
  publicitat: Publicitat;
  audiencies: Audiencies;
  youbora: Youbora;
  relacionats: Relacionats;
  recomanats: Recomanats;
}
