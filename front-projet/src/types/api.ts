export interface Cargo {
  id: number;
  nome: string;
}

export interface CargoPayload {
  nome: string;
}

export interface Integrante {
  id: number;
  nome: string;
  funcao: string;
}

export interface IntegrantePayload {
  nome: string;
  cargoId: number;
}

export interface Time {
  id: number;
  nomeDoClube: string;
  data: string;
  integrantes: Integrante[];
}

export interface TimePayload {
  nomeDoClube: string;
  data: string;
  integranteIds: number[];
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface Page<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}
