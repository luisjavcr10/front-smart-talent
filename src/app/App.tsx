import { Outlet } from 'react-router-dom'
import { Sidebar } from '../shared/components/Sidebar'
import ThemeToggle from '../shared/components/ThemeToggle'

export default function App() {
  return (
    <div className="w-full bg-white dark:bg-background text-foreground min-h-screen flex font-bevietnampro">
      {/* Smart Talent Header */}
      
      <Sidebar />
      <main className='w-full'>
          <Outlet />
          <ThemeToggle position='right'/>
      </main>
      
      {/* Smart Talent */}
    </div>
  )
}