import { Outlet } from 'react-router-dom'
import { Sidebar } from '../shared/components/Sidebar'
import ThemeToggle from '../shared/components/ThemeToggle'

export default function App() {
  return (
    <div className="app-container bg-gray dark:bg-background text-foreground min-h-screen flex">
      {/* Aquí puedes colocar elementos que quieres en todas las páginas: */}
      {/*<header>Smart Talent Header</header>*/}
      <Sidebar />
      <main className='flex-1 ml-80'>
          <Outlet />
          <ThemeToggle position='right'/>
      </main>
      
      {/*<footer>© 2023 Smart Talent</footer>*/}
    </div>
  )
}