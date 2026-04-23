import type { 
  Integrante, 
  IntegrantePayload, 
  Time, 
  TimePayload, 
  Page,
  Cargo,
  CargoPayload
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function fetchClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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

export const cargosApi = {
  listar: () => fetchClient<Cargo[]>('/api/cargos'),
  
  buscarPorId: (id: number) => fetchClient<Cargo>(`/api/cargos/${id}`),
  
  cadastrar: (data: CargoPayload) => 
    fetchClient<Cargo>('/api/cargos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  atualizar: (id: number, data: CargoPayload) =>
    fetchClient<Cargo>(`/api/cargos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  remover: (id: number) =>
    fetchClient<void>(`/api/cargos/${id}`, {
      method: 'DELETE',
    }),
};

export const integrantesApi = {
  listarSemTime: () =>
    fetchClient<Integrante[]>('/api/integrantes/sem-times'),

  cadastrar: (data: IntegrantePayload) => 
    fetchClient<Integrante>('/api/integrantes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  atualizar: (id: number, data: IntegrantePayload) =>
    fetchClient<Integrante>(`/api/integrantes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remover: (id: number) =>
    fetchClient<void>(`/api/integrantes/${id}`, {
      method: 'DELETE',
    }),
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
  listar: (params?: TimesQueryParams) => {
    const urlParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          urlParams.append(key, value.toString());
        }
      });
    }
    const queryString = urlParams.toString();
    const endpoint = queryString ? `/api/times?${queryString}` : '/api/times';
    return fetchClient<Page<Time>>(endpoint);
  },

  buscarPorId: (id: number) =>
    fetchClient<Time>(`/api/times/${id}`),

  cadastrar: (data: TimePayload) =>
    fetchClient<Time>('/api/times', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  atualizar: (id: number, data: TimePayload) =>
    fetchClient<Time>(`/api/times/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remover: (id: number) =>
    fetchClient<void>(`/api/times/${id}`, {
      method: 'DELETE',
    }),
};

export const relatoriosApi = {
  clubeMaisRecorrente: (inicio?: string, fim?: string) => {
    const params = new URLSearchParams();
    if (inicio) params.append('inicio', inicio);
    if (fim) params.append('fim', fim);
    const qs = params.toString();
    return fetchClient<string>(`/api/clube-mais-recorrente${qs ? `?${qs}` : ''}`);
  },

  contagemClubes: (inicio?: string, fim?: string) => {
    const params = new URLSearchParams();
    if (inicio) params.append('inicio', inicio);
    if (fim) params.append('fim', fim);
    const qs = params.toString();
    return fetchClient<Record<string, number>>(`/api/contagem-clubes${qs ? `?${qs}` : ''}`);
  },

  contagemFuncoes: (inicio?: string, fim?: string) => {
    const params = new URLSearchParams();
    if (inicio) params.append('inicio', inicio);
    if (fim) params.append('fim', fim);
    const qs = params.toString();
    return fetchClient<Record<string, number>>(`/api/contagem-funcoes${qs ? `?${qs}` : ''}`);
  },

  funcaoMaisRecorrente: (inicio?: string, fim?: string) => {
    const params = new URLSearchParams();
    if (inicio) params.append('inicio', inicio);
    if (fim) params.append('fim', fim);
    const qs = params.toString();
    return fetchClient<string>(`/api/funcao-mais-recorrente${qs ? `?${qs}` : ''}`);
  },

  integranteMaisUsado: (inicio?: string, fim?: string) => {
    const params = new URLSearchParams();
    if (inicio) params.append('inicio', inicio);
    if (fim) params.append('fim', fim);
    const qs = params.toString();
    return fetchClient<Integrante>(`/api/integrante-mais-usado${qs ? `?${qs}` : ''}`);
  },

  timeMaisRecorrente: (inicio?: string, fim?: string) => {
    const params = new URLSearchParams();
    if (inicio) params.append('inicio', inicio);
    if (fim) params.append('fim', fim);
    const qs = params.toString();
    return fetchClient<string[]>(`/api/time-mais-recorrente${qs ? `?${qs}` : ''}`);
  },

  timePorData: (data: string) => {
    return fetchClient<Time>(`/api/time?data=${data}`);
  }
};
