import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { integrantesApi, cargosApi } from '../services/apiClient';
import toast from 'react-hot-toast';
import Select from 'react-select';

interface CargoOption {
  value: number;
  label: string;
}

export function CadastroIntegrantes() {
  const [loading, setLoading] = useState(false);
  const [cargosLoading, setCargosLoading] = useState(true);
  const [cargosOptions, setCargosOptions] = useState<CargoOption[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<CargoOption | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
  });

  useEffect(() => {
    const loadCargos = async () => {
      try {
        const response = await cargosApi.listar();
        const options = response.map(cargo => ({
          value: cargo.id,
          label: cargo.nome,
        }));
        setCargosOptions(options);
      } catch (error) {
        toast.error('Erro ao carregar lista de cargos.');
        console.error(error);
      } finally {
        setCargosLoading(false);
      }
    };

    loadCargos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !selectedCargo) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    setLoading(true);
    try {
      await integrantesApi.cadastrar({
        nome: formData.nome,
        cargoId: selectedCargo.value,
      });
      toast.success('Integrante cadastrado com sucesso!');
      setFormData({ nome: '' });
      setSelectedCargo(null);
    } catch (error) {
      toast.error('Erro ao cadastrar integrante.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: '42px',
      borderRadius: '10px',
      borderColor: state.isFocused ? '#2563EB' : '#E5E7EB',
      boxShadow: state.isFocused ? '0 0 0 1px #2563EB' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#2563EB' : '#CBD5F5'
      },
      backgroundColor: 'transparent'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#1E293B'
        : state.isFocused
          ? '#F8FAFC'
          : 'transparent',
      color: state.isSelected ? '#FFFFFF' : '#0F172A',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#F1F5F9'
      }
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#475569'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#0F172A'
    })
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-lg">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Cadastro de Integrantes</h2>
        <p className="text-text-secondary mt-1">Adicione um novo membro ao sistema.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          <Input
            label="Nome Completo"
            placeholder="Ex: Élin Duxus"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-text-primary">
              Função / Cargo <span className="text-danger">*</span>
            </label>
            <Select
              isLoading={cargosLoading}
              options={cargosOptions}
              value={selectedCargo}
              onChange={(option) => setSelectedCargo(option as CargoOption)}
              placeholder="Selecione um cargo..."
              noOptionsMessage={() => "Nenhum cargo encontrado"}
              styles={customSelectStyles}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div className="flex justify-end pt-sm border-t border-border mt-sm">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Cadastrando...' : 'Cadastrar Integrante'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
