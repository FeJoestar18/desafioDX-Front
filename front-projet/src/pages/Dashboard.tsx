import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { timesApi } from '../services/apiClient';
import type { Time } from '../types/api';
import toast from 'react-hot-toast';
import { Users, Calendar, Trophy } from 'lucide-react';

export function Dashboard() {
  const [times, setTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTimes = async () => {
      try {
        // Buscando a primeira página com um tamanho grande para exibir no dashboard
        const response = await timesApi.listar({ pageNumber: 0, pageSize: 50 });
        setTimes(response.content);
      } catch (error) {
        toast.error('Erro ao carregar times para o dashboard.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTimes();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (times.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-text-secondary gap-4 min-h-[400px]">
        <Trophy className="w-12 h-12 text-border" />
        <p>Nenhum time cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-lg h-full">
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Dashboard de Times</h2>
        <p className="text-text-secondary mt-1">Visão geral de todos os times e seus integrantes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
        {times.map((time) => (
          <Card key={time.id} hoverable className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#EEF2FF] flex items-center justify-center shrink-0 border border-[#E0E7FF]">
                  <Trophy className="w-5 h-5 text-[#3730A3]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary leading-tight">{time.nomeDoClube}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(time.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
                  <Users className="w-4 h-4 text-text-secondary" />
                  <span>Integrantes</span>
                </div>
                <span className="text-[12px] font-medium bg-[#EEF2FF] text-[#3730A3] border border-[#E0E7FF] px-2.5 py-0.5 rounded-full">
                  {time.integrantes?.length || 0} membro(s)
                </span>
              </div>

              {time.integrantes && time.integrantes.length > 0 ? (
                <div className="space-y-2 overflow-y-auto max-h-[200px] custom-scrollbar pr-1">
                  {time.integrantes.map((integrante) => (
                    <div 
                      key={integrante.id} 
                      className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#CBD5F5] transition-colors"
                    >
                      <span className="text-[14px] font-medium text-text-primary truncate pr-2">
                        {integrante.nome}
                      </span>
                      <span className="text-[12px] font-medium text-[#475569] bg-white px-2 py-0.5 rounded-md border border-[#E5E7EB] shrink-0">
                        {integrante.funcao}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50/50 rounded-lg border border-dashed border-border py-6">
                  <p className="text-sm text-text-secondary italic">Sem integrantes vinculados.</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
