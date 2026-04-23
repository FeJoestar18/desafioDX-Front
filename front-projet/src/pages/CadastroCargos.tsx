import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { cargosApi } from '../services/apiClient';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

export function CadastroCargos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [formData, setFormData] = useState({
    nome: '',
  });

  useEffect(() => {
    if (isEditing && id) {
      const loadCargo = async () => {
        try {
          const cargo = await cargosApi.buscarPorId(Number(id));
          setFormData({
            nome: cargo.nome,
          });
        } catch (error) {
          toast.error('Erro ao carregar dados do cargo.');
          navigate('/cargos');
        } finally {
          setFetching(false);
        }
      };
      loadCargo();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      toast.error('Preencha o nome do cargo!');
      return;
    }

    setLoading(true);
    try {
      if (isEditing && id) {
        await cargosApi.atualizar(Number(id), {
          nome: formData.nome,
        });
        toast.success('Cargo atualizado com sucesso!');
        navigate('/cargos');
      } else {
        await cargosApi.cadastrar({
          nome: formData.nome,
        });
        toast.success('Cargo cadastrado com sucesso!');
        setFormData({ nome: '' });
      }
    } catch (error) {
      toast.error(isEditing ? 'Erro ao atualizar cargo.' : 'Erro ao cadastrar cargo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-lg">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">
          {isEditing ? 'Editar Cargo' : 'Cadastro de Cargos'}
        </h2>
        <p className="text-text-secondary mt-1">
          {isEditing ? 'Altere o nome do cargo.' : 'Crie um novo cargo no sistema.'}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          <Input
            label="Nome do Cargo"
            placeholder="Ex: Desenvolvedor Front-end"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />

          <div className="flex justify-end gap-3 pt-sm border-t border-border mt-sm">
            {isEditing && (
              <Button type="button" variant="ghost" onClick={() => navigate('/cargos')}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Cargo')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}