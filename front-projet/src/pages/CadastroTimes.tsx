import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { timesApi, integrantesApi } from '../services/apiClient';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import type { Integrante } from '../types/api';

export function CadastroTimes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // Alterado para buscar sempre
  const [formData, setFormData] = useState({
    nomeDoClube: '',
    data: ''
  });

  const [availableMembers, setAvailableMembers] = useState<Integrante[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const semTimes = await integrantesApi.listarSemTime();
        
        if (isEditing && id) {
          const time = await timesApi.buscarPorId(Number(id));
          setFormData({
            nomeDoClube: time.nomeDoClube,
            data: time.data ? time.data.split('T')[0] : ''
          });
          
          const currentMembers = time.integrantes || [];
          setSelectedMembers(currentMembers.map(i => i.id));
          
          // Combina integrantes sem time com os integrantes atuais do time (evitando duplicidade)
          const combined = [
            ...currentMembers, 
            ...semTimes.filter(st => !currentMembers.some(cm => cm.id === st.id))
          ];
          setAvailableMembers(combined);
        } else {
          setAvailableMembers(semTimes);
        }
      } catch (error) {
        toast.error('Erro ao carregar os dados.');
        if (isEditing) navigate('/times');
      } finally {
        setFetching(false);
      }
    };
    
    loadData();
  }, [id, isEditing, navigate]);

  const handleCheckboxChange = (memberId: number, checked: boolean) => {
    if (checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nomeDoClube || !formData.data) {
      toast.error('Preencha os campos obrigatórios!');
      return;
    }

    setLoading(true);
    try {
      if (isEditing && id) {
        await timesApi.atualizar(Number(id), {
          nomeDoClube: formData.nomeDoClube,
          data: formData.data,
          integranteIds: selectedMembers
        });
        toast.success('Time atualizado com sucesso!');
        navigate('/times');
      } else {
        await timesApi.cadastrar({
          nomeDoClube: formData.nomeDoClube,
          data: formData.data,
          integranteIds: selectedMembers
        });
        toast.success('Time cadastrado com sucesso!');
        setFormData({ nomeDoClube: '', data: '' });
        setSelectedMembers([]);
        // Recarregar os disponíveis
        const semTimes = await integrantesApi.listarSemTime();
        setAvailableMembers(semTimes);
      }
    } catch (error) {
      toast.error(isEditing ? 'Erro ao atualizar time.' : 'Erro ao cadastrar time.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-lg">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">
          {isEditing ? 'Editar Time' : 'Cadastro de Times'}
        </h2>
        <p className="text-text-secondary mt-1">
          {isEditing ? 'Altere as informações do time.' : 'Crie um novo time e vincule os integrantes.'}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          <Input
            label="Nome do Clube / Time"
            placeholder="Ex: Desenvolvimento Alpha"
            value={formData.nomeDoClube}
            onChange={(e) => setFormData({ ...formData, nomeDoClube: e.target.value })}
            required
          />

          <Input
            label="Data de Criação"
            type="date"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            required
          />

          <div className="space-y-2">
            <label className="block text-[14px] font-medium text-text-primary">Integrantes (Opcional)</label>
            <div className="border border-border rounded-[10px] max-h-[240px] overflow-y-auto custom-scrollbar bg-surface shadow-sm">
              {availableMembers.length === 0 ? (
                <div className="p-6 text-center text-sm text-text-secondary flex flex-col items-center justify-center gap-2">
                  <p>Nenhum integrante disponível no momento.</p>
                  <p className="text-xs">Todos os integrantes cadastrados já possuem um time.</p>
                </div>
              ) : (
                availableMembers.map(m => (
                  <label 
                    key={m.id} 
                    className="flex items-center gap-3 p-3 hover:bg-[#F8FAFC] cursor-pointer border-b border-border last:border-0 transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      className="w-[18px] h-[18px] rounded-[4px] border-border text-secondary focus:ring-secondary/20 cursor-pointer"
                      checked={selectedMembers.includes(m.id)}
                      onChange={(e) => handleCheckboxChange(m.id, e.target.checked)}
                    />
                    <div>
                      <p className="text-[14px] font-medium text-text-primary leading-tight">{m.nome}</p>
                      <p className="text-[12px] text-text-secondary mt-0.5">{m.funcao} (ID: {m.id})</p>
                    </div>
                  </label>
                ))
              )}
            </div>
            <p className="text-[12px] text-text-secondary mt-1">
              Selecione os integrantes para compor este time. Apenas integrantes sem time aparecerão aqui.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-sm border-t border-border mt-sm">
            {isEditing && (
              <Button type="button" variant="ghost" onClick={() => navigate('/times')}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Time')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
