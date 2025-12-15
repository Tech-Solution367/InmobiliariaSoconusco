interface StatusBadgeProps {
  status: 'nuevo' | 'en_proceso' | 'cerrado_ganado' | 'cerrado_perdido';
}

const statusConfig = {
  nuevo: { label: 'Nuevo', color: 'bg-blue-100 text-blue-800 border border-blue-200' },
  en_proceso: { label: 'En Proceso', color: 'bg-amber-100 text-amber-800 border border-amber-200' },
  cerrado_ganado: { label: 'Ganado', color: 'bg-emerald-100 text-emerald-800 border border-emerald-200' },
  cerrado_perdido: { label: 'Perdido', color: 'bg-red-100 text-red-800 border border-red-200' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.nuevo;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${config.color}`}>
      {config.label}
    </span>
  );
}
