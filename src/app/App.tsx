import { Outlet } from 'react-router-dom'
import { Sidebar } from '../shared/components/Sidebar'

export default function App() {
  return (
    <div className="w-full bg-white dark:bg-black text-foreground min-h-screen flex font-karla">
      {/* Smart Talent Header */}
      
      <Sidebar />
      <main className='w-full'>
          <Outlet />
      </main>
      
      {/* Smart Talent */}
    </div>
  )
}