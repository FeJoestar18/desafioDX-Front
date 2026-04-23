import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { cargosApi } from '../services/apiClient';
import type { Cargo } from '../types/api';
import { Edit2, Trash2, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function Cargos() {
  const navigate = useNavigate();
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cargoToDelete, setCargoToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCargos = async () => {
    setLoading(true);
    try {
      const response = await cargosApi.listar();
      setCargos(response);
    } catch (error) {
      toast.error('Erro ao carregar os cargos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCargos();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/cadastro-cargos/${id}`);
  };

  const openDeleteModal = (id: number) => {
    setCargoToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCargoToDelete(null);
  };

  const confirmDelete = async () => {
    if (cargoToDelete === null) return;

    setIsDeleting(true);
    try {
      await cargosApi.remover(cargoToDelete);
      toast.success('Cargo excluído com sucesso!');
      fetchCargos();
      closeDeleteModal();
    } catch (error) {
      toast.error('Erro ao excluir o cargo.');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-lg h-full">
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Cargos</h2>
        <p className="text-text-secondary mt-1">Gerencie os cargos e funções disponíveis no sistema.</p>
      </div>

      <Card className="flex-1 flex flex-col min-h-[400px]">
        {loading ? (
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full h-10 bg-border/40 rounded-lg animate-pulse mb-2"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-16 bg-border/20 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : cargos.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-text-secondary gap-4 min-h-[300px]">
            <Briefcase className="w-12 h-12 text-border" />
            <p>Nenhum cargo encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F1F5F9] border-y border-[#E5E7EB]">
                  <th className="py-3 px-4 font-medium text-[13px] text-[#334155] uppercase tracking-wider">ID</th>
                  <th className="py-3 px-4 font-medium text-[13px] text-[#334155] uppercase tracking-wider">Nome do Cargo</th>
                  <th className="py-3 px-4 font-medium text-[13px] text-[#334155] uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {cargos.map((cargo) => (
                  <tr key={cargo.id} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors group">
                    <td className="py-4 px-4 text-[14px] text-text-secondary">#{cargo.id}</td>
                    <td className="py-4 px-4 text-[14px] font-semibold text-text-primary">{cargo.nome}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(cargo.id)}
                          className="p-2 text-text-secondary hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-[18px] h-[18px]" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(cargo.id)}
                          className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Excluir Cargo"
        description="Tem certeza que deseja excluir este cargo? Esta ação não pode ser desfeita."
        confirmText="Excluir Cargo"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        isLoading={isDeleting}
      />
    </div>
  );
}