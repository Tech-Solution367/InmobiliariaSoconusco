'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from './StatusBadge';

interface Agent {
  _id: string;
  name: string;
}

interface Lead {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'nuevo' | 'en_proceso' | 'cerrado_ganado' | 'cerrado_perdido';
  property: { _id: string; title: string };
  assignedAgent?: { _id: string; name: string };
  createdAt: string;
  nextFollowUp?: string;
}

interface LeadsTableProps {
  initialLeads: Lead[];
}

export default function LeadsTable({ initialLeads }: LeadsTableProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // Fetch agents when component mounts
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAgents(data.data);
      })
      .catch(err => console.error('Error fetching agents:', err));
  }, []);

  const handleUpdate = async (id: string, updates: Partial<Lead>) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        setEditingId(null);
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Cliente</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Contacto</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Propiedad</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Agente</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Estado</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Fecha</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {initialLeads.map((lead) => (
            <tr key={lead._id} className="hover:bg-slate-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-slate-800">{lead.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-600">{lead.email}</div>
                <div className="text-sm text-slate-500">{lead.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lead.property ? (
                  <Link href={`/properties/${lead.property._id}`} className="text-sm text-amber-600 hover:text-amber-700 hover:underline truncate max-w-xs block font-medium">
                    {lead.property.title}
                  </Link>
                ) : (
                  <span className="text-sm text-slate-400 italic">Propiedad eliminada</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === lead._id ? (
                  <select
                    value={lead.assignedAgent?._id || ''}
                    onChange={(e) => handleUpdate(lead._id, { assignedAgent: e.target.value ? { _id: e.target.value, name: '' } : undefined })}
                    disabled={loading}
                    className="text-sm border-slate-300 rounded-md shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 w-32 py-1"
                  >
                    <option value="">Sin asignar</option>
                    {agents.map(agent => (
                      <option key={agent._id} value={agent._id}>{agent.name}</option>
                    ))}
                  </select>
                ) : (
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${lead.assignedAgent ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500 italic'}`}>
                    {lead.assignedAgent?.name || 'Sin asignar'}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === lead._id ? (
                  <select
                    value={lead.status}
                    onChange={(e) => handleUpdate(lead._id, { status: e.target.value as any })}
                    disabled={loading}
                    className="text-sm border-slate-300 rounded-md shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 py-1"
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="cerrado_ganado">Ganado</option>
                    <option value="cerrado_perdido">Perdido</option>
                  </select>
                ) : (
                  <StatusBadge status={lead.status} />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setEditingId(editingId === lead._id ? null : lead._id)}
                  className={`px-3 py-1 rounded-md transition-colors ${editingId === lead._id ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {editingId === lead._id ? 'Cancelar' : 'Editar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {initialLeads.length === 0 && (
        <div className="p-12 text-center text-slate-500 bg-slate-50">
          <p className="text-lg">No hay leads registrados aún.</p>
        </div>
      )}
    </div>
  );
}
