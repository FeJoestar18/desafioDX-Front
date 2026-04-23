import type { 
  Integrante, 
  IntegrantePayload, 
  Time, 
  TimePayload, 
  Page,
  Cargo,
  CargoPayload
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const buildUrl = (endpoint: string, params?: Record<string, any>) => {
  if (!params) return `${API_BASE_URL}${endpoint}`;

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.append(key, String(value));
    }
  });

  const qs = search.toString();
  return `${API_BASE_URL}${endpoint}${qs ? `?${qs}` : ''}`;
};

async function request<T>(endpoint: string, options?: RequestInit, params?: Record<string, any>): Promise<T> {
  const response = await fetch(buildUrl(endpoint, params), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text().catch(() => response.statusText);
    throw new Error(`API Error: ${response.status} ${errorMessage}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return response.text() as unknown as T;
}

export const http = {
  get: <T>(url: string, params?: Record<string, any>) => request<T>(url, { method: 'GET' }, params),
  post: <T>(url: string, data?: any) => request<T>(url, { method: 'POST', body: JSON.stringify(data) }),
  put: <T>(url: string, data?: any) => request<T>(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(url: string) => request<T>(url, { method: 'DELETE' })
};

export const cargosApi = {
  listar: () => http.get<Cargo[]>('/api/cargos'),
  buscarPorId: (id: number) => http.get<Cargo>(`/api/cargos/${id}`),
  cadastrar: (data: CargoPayload) => http.post<Cargo>('/api/cargos', data),
  atualizar: (id: number, data: CargoPayload) => http.put<Cargo>(`/api/cargos/${id}`, data),
  remover: (id: number) => http.delete<void>(`/api/cargos/${id}`),
};

export const integrantesApi = {
  listarSemTime: () => http.get<Integrante[]>('/api/integrantes/sem-times'),
  cadastrar: (data: IntegrantePayload) => http.post<Integrante>('/api/integrantes', data),
  atualizar: (id: number, data: IntegrantePayload) => http.put<Integrante>(`/api/integrantes/${id}`, data),
  remover: (id: number) => http.delete<void>(`/api/integrantes/${id}`),
};

export interface TimesQueryParams {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  unpaged?: boolean;
  'sort.sorted'?: boolean;
  'sort.unsorted'?: boolean;
}

export const timesApi = {
  listar: (params?: TimesQueryParams) => http.get<Page<Time>>('/api/times', params),
  buscarPorId: (id: number) => http.get<Time>(`/api/times/${id}`),
  cadastrar: (data: TimePayload) => http.post<Time>('/api/times', data),
  atualizar: (id: number, data: TimePayload) => http.put<Time>(`/api/times/${id}`, data),
  remover: (id: number) => http.delete<void>(`/api/times/${id}`),
};

const withDateRange = (inicio?: string, fim?: string) => ({ inicio, fim });

export const relatoriosApi = {
  clubeMaisRecorrente: (inicio?: string, fim?: string) =>
    http.get<string>('/api/clube-mais-recorrente', withDateRange(inicio, fim)),

  contagemClubes: (inicio?: string, fim?: string) =>
    http.get<Record<string, number>>('/api/contagem-clubes', withDateRange(inicio, fim)),

  contagemFuncoes: (inicio?: string, fim?: string) =>
    http.get<Record<string, number>>('/api/contagem-funcoes', withDateRange(inicio, fim)),

  funcaoMaisRecorrente: (inicio?: string, fim?: string) =>
    http.get<string>('/api/funcao-mais-recorrente', withDateRange(inicio, fim)),

  integranteMaisUsado: (inicio?: string, fim?: string) =>
    http.get<Integrante>('/api/integrante-mais-usado', withDateRange(inicio, fim)),

  timeMaisRecorrente: (inicio?: string, fim?: string) =>
    http.get<string[]>('/api/time-mais-recorrente', withDateRange(inicio, fim)),

  timePorData: (data: string) =>
    http.get<Time>('/api/time', { data })
};
