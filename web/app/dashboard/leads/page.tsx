import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Property from '@/models/Property'; // Ensure models are registered
import Agent from '@/models/Agent'; // Ensure models are registered
import LeadsTable from '@/components/LeadsTable';
import Navbar from '@/components/Navbar';

import Footer from '@/components/Footer';

// Force dynamic rendering so we always get the latest leads
export const dynamic = 'force-dynamic';

async function getLeads() {
  await dbConnect();
  // Ensure models are compiled
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _p = Property;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _a = Agent;

  const leads = await Lead.find({})
    .populate('property', 'title')
    .populate('assignedAgent', 'name')
    .sort({ createdAt: -1 })
    .lean();

  return leads.map((lead: any) => ({
    ...lead,
    _id: lead._id.toString(),
    property: lead.property ? { ...lead.property, _id: lead.property._id.toString() } : null,
    assignedAgent: lead.assignedAgent ? { ...lead.assignedAgent, _id: lead.assignedAgent._id.toString() } : null,
    createdAt: lead.createdAt.toISOString(),
    nextFollowUp: lead.nextFollowUp ? lead.nextFollowUp.toISOString() : undefined,
  }));
}

export default async function LeadsDashboard() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard de Leads</h1>
            <p className="text-slate-500 mt-1">Gestiona tus clientes y asignaciones</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200 text-sm text-slate-600 flex items-center gap-2">
            <span className="text-slate-400">Total Leads:</span>
            <span className="font-bold text-2xl text-amber-500">{leads.length}</span>
          </div>
        </div>

        <LeadsTable initialLeads={leads} />
      </div>
      <Footer />
    </div>
  );
}
