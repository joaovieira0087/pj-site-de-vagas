import { supabase } from '../lib/supabase' 
export default async function Home() {
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return <div className="p-10 text-red-500">Erro ao carregar vagas. Verifique o console.</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Vagas do WhatsApp 🚀
        </h1>
        
        <div className="space-y-4">
          {jobs?.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-blue-500 font-medium">{job.company}</p>
              <div className="mt-3 text-gray-600">
                {job.description}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                  {job.category}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
          
          {jobs?.length === 0 && (
            <p className="text-center text-gray-500">Nenhuma vaga encontrada no banco de dados.</p>
          )}
        </div>
      </div>
    </main>
  )
}