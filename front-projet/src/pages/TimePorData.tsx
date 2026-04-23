import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { relatoriosApi } from '../services/apiClient';
import toast from 'react-hot-toast';
import type { Time } from '../types/api';
import { Search, Calendar, Users } from 'lucide-react';

export function TimePorData() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<Time | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) {
      toast.error('Selecione uma data para buscar!');
      return;
    }

    setLoading(true);
    try {
      const response = await relatoriosApi.timePorData(data);
      setTime(response);
    } catch (error) {
      toast.error('Nenhum time encontrado para esta data.');
      setTime(null);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-lg h-full">
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Buscar Time por Data</h2>
        <p className="text-text-secondary mt-1">Insira uma data específica para encontrar qual time foi formado.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-md">
          <div className="flex-1 w-full">
            <Input
              label="Data de Formação"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto h-[40px] shrink-0 gap-2">
            <Search className="w-4 h-4" />
            {loading ? 'Buscando...' : 'Buscar Time'}
          </Button>
        </form>
      </Card>

      {searched && (
        <div className="mt-4">
          {time ? (
            <Card hoverable className="flex flex-col gap-md">
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{time.nomeDoClube}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-text-secondary mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(time.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <div className="bg-primary-soft text-primary px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  ID: #{time.id}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-3">Integrantes ({time.integrantes?.length || 0})</h4>
                {time.integrantes && time.integrantes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {time.integrantes.map((integrante) => (
                      <div key={integrante.id} className="bg-[#F1F5F9] p-3 rounded-lg flex flex-col gap-1 border border-transparent hover:border-border transition-colors">
                        <span className="font-semibold text-text-primary truncate">{integrante.nome}</span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-secondary">{integrante.funcao}</span>
                          <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-text-secondary border border-border">
                            ID: {integrante.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary italic">Sem integrantes vinculados.</p>
                )}
              </div>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-[20px]">
              <Search className="w-10 h-10 text-text-secondary/50 mb-3" />
              <p className="text-text-primary font-medium">Nenhum time encontrado</p>
              <p className="text-sm text-text-secondary mt-1">Tente buscar por uma data diferente.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
