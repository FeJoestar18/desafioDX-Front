import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { relatoriosApi } from '../services/apiClient';
import toast from 'react-hot-toast';
import type { Integrante } from '../types/api';

export function Estatisticas() {
  const [loading, setLoading] = useState(false);
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  // Estados dos resultados
  const [clubeMaisRecorrente, setClubeMaisRecorrente] = useState<string | null>(null);
  const [funcaoMaisRecorrente, setFuncaoMaisRecorrente] = useState<string | null>(null);
  const [timeMaisRecorrente, setTimeMaisRecorrente] = useState<string[] | null>(null);
  const [integranteMaisUsado, setIntegranteMaisUsado] = useState<Integrante | null>(null);
  const [contagemClubes, setContagemClubes] = useState<Record<string, number> | null>(null);
  const [contagemFuncoes, setContagemFuncoes] = useState<Record<string, number> | null>(null);

  const fetchEstatisticas = async () => {
    setLoading(true);
    try {
      // Como não são promises encadeadas que dependem uma da outra, rodamos em paralelo
      const [
        clubeReq,
        funcaoReq,
        timeReq,
        integranteReq,
        countClubesReq,
        countFuncoesReq
      ] = await Promise.allSettled([
        relatoriosApi.clubeMaisRecorrente(inicio, fim),
        relatoriosApi.funcaoMaisRecorrente(inicio, fim),
        relatoriosApi.timeMaisRecorrente(inicio, fim),
        relatoriosApi.integranteMaisUsado(inicio, fim),
        relatoriosApi.contagemClubes(inicio, fim),
        relatoriosApi.contagemFuncoes(inicio, fim)
      ]);

      setClubeMaisRecorrente(clubeReq.status === 'fulfilled' ? clubeReq.value : 'N/A');
      setFuncaoMaisRecorrente(funcaoReq.status === 'fulfilled' ? funcaoReq.value : 'N/A');
      setTimeMaisRecorrente(timeReq.status === 'fulfilled' ? timeReq.value : []);
      setIntegranteMaisUsado(integranteReq.status === 'fulfilled' ? integranteReq.value : null);
      setContagemClubes(countClubesReq.status === 'fulfilled' ? countClubesReq.value : {});
      setContagemFuncoes(countFuncoesReq.status === 'fulfilled' ? countFuncoesReq.value : {});

      toast.success('Estatísticas atualizadas!');
    } catch (error) {
      toast.error('Erro ao carregar algumas estatísticas.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEstatisticas();
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-lg h-full">
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Estatísticas por Período</h2>
        <p className="text-text-secondary mt-1">Consulte as principais métricas dos times em um intervalo de datas.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-md">
          <Input
            label="Data de Início"
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />
          <Input
            label="Data de Fim"
            type="date"
            value={fim}
            onChange={(e) => setFim(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full sm:w-auto h-[40px] shrink-0">
            {loading ? 'Buscando...' : 'Buscar Estatísticas'}
          </Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <Card className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-text-secondary">Clube Mais Recorrente</h3>
          <p className="text-2xl font-bold text-text-primary">{clubeMaisRecorrente || '-'}</p>
        </Card>

        <Card className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-text-secondary">Função Mais Recorrente</h3>
          <p className="text-2xl font-bold text-text-primary">{funcaoMaisRecorrente || '-'}</p>
        </Card>

        <Card className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-text-secondary">Integrante Mais Usado</h3>
          {integranteMaisUsado ? (
            <div>
              <p className="text-xl font-bold text-text-primary">{integranteMaisUsado.nome}</p>
              <p className="text-sm text-text-secondary">{integranteMaisUsado.funcao} (ID: {integranteMaisUsado.id})</p>
            </div>
          ) : (
            <p className="text-xl font-bold text-text-primary">-</p>
          )}
        </Card>

        <Card className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-text-secondary">Integrantes do Time Mais Recorrente</h3>
          {timeMaisRecorrente && timeMaisRecorrente.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-1">
              {timeMaisRecorrente.map((nome, i) => (
                <span key={i} className="bg-primary-soft text-primary px-2.5 py-1 rounded-md text-sm font-medium">
                  {nome}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xl font-bold text-text-primary">-</p>
          )}
        </Card>

        <Card className="flex flex-col gap-3 md:col-span-2">
          <h3 className="text-sm font-semibold text-text-secondary">Contagem de Clubes</h3>
          {contagemClubes && Object.keys(contagemClubes).length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(contagemClubes).map(([clube, count]) => (
                <div key={clube} className="bg-[#F1F5F9] p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium text-text-primary truncate mr-2">{clube}</span>
                  <span className="text-lg font-bold text-primary">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">Nenhum dado encontrado.</p>
          )}
        </Card>

        <Card className="flex flex-col gap-3 md:col-span-2">
          <h3 className="text-sm font-semibold text-text-secondary">Contagem de Funções</h3>
          {contagemFuncoes && Object.keys(contagemFuncoes).length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(contagemFuncoes).map(([funcao, count]) => (
                <div key={funcao} className="bg-[#F1F5F9] p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium text-text-primary truncate mr-2">{funcao}</span>
                  <span className="text-lg font-bold text-primary">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">Nenhum dado encontrado.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
