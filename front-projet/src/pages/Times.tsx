import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { timesApi } from '../services/apiClient';
import type { Time } from '../types/api';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Times() {
  const [times, setTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [timeToDelete, setTimeToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTimes = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await timesApi.listar({ pageNumber, pageSize: 10 });
      setTimes(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error('Erro ao carregar a lista de times.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimes(page);
  }, [page]);

  const openDeleteModal = (id: number) => {
    setTimeToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setTimeToDelete(null);
  };

  const confirmDelete = async () => {
    if (timeToDelete === null) return;

    setIsDeleting(true);
    try {
      await timesApi.remover(timeToDelete);
      toast.success('Time excluído com sucesso!');
      if (times.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        fetchTimes(page);
      }
      closeDeleteModal();
    } catch (error) {
      toast.error('Erro ao excluir o time.');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/cadastro-times/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-lg h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Times</h2>
          <p className="text-text-secondary mt-1">Gerencie os times cadastrados e seus integrantes.</p>
        </div>
        <Button onClick={() => navigate('/cadastro-times')} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Time
        </Button>
      </div>

      <Card className="flex-1 flex flex-col min-h-[400px]">
        {loading ? (
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full h-10 bg-border/40 rounded-lg animate-pulse mb-2"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-16 bg-border/20 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : times.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-text-secondary gap-4 min-h-[300px]">
            <Users className="w-12 h-12 text-border" />
            <p>Nenhum time encontrado.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1F5F9] border-y border-[#E5E7EB]">
                    <th className="py-3 px-4 font-medium text-[13px] text-[#334155] uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 font-medium text-[13px] text-[#334155] uppercase tracking-wider">Nome do Clube</th>
                    <th className="py-3 px-4 font-medium text-[13px] text-[#334155] uppercase tracking-wider">Data</th>
                    <th className="py-3 px-4 font-medium text-[13px] text-[#334155] uppercase tracking-wider">Integrantes</th>
                    <th className="py-3 px-4 font-medium text-[13px] text-[#334155] uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {times.map((time) => (
                    <tr key={time.id} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC] transition-colors group">
                      <td className="py-4 px-4 text-[14px] text-text-secondary">#{time.id}</td>
                      <td className="py-4 px-4 text-[14px] font-semibold text-text-primary">{time.nomeDoClube}</td>
                      <td className="py-4 px-4 text-[14px] text-text-secondary">
                        {new Date(time.data).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-4 px-4 text-sm text-text-secondary">
                        <div className="flex flex-wrap gap-1.5">
                          {time.integrantes?.map(int => (
                            <span key={int.id} className="bg-[#EEF2FF] text-[#3730A3] px-2.5 py-1 rounded-full text-[12px] font-medium border border-[#E0E7FF]">
                              {int.nome}
                            </span>
                          ))}
                          {(!time.integrantes || time.integrantes.length === 0) && (
                            <span className="text-text-secondary/50 italic text-[12px]">Nenhum integrante</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(time.id)}
                            className="p-2 text-text-secondary hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-[18px] h-[18px]" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(time.id)}
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

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  disabled={page === 0}
                  onClick={() => setPage(p => p - 1)}
                  className="!px-4 !py-2 text-[14px]"
                >
                  Anterior
                </Button>
                <span className="text-[14px] text-text-secondary font-medium">
                  Página {page + 1} de {totalPages}
                </span>
                <Button
                  variant="ghost"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(p => p + 1)}
                  className="!px-4 !py-2 text-[14px]"
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}
      </Card>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Excluir Time"
        description="Tem certeza que deseja excluir este time? Esta ação não pode ser desfeita."
        confirmText="Excluir Time"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        isLoading={isDeleting}
      />
    </div>
  );
}
