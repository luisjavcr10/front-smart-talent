import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="app-container">
      {/* Aquí puedes colocar elementos que quieres en todas las páginas: */}
      <header>Smart Talent Header</header>
      
      <main>
        <Outlet />  {/* Aquí se renderizarán las páginas hijas */}
      </main>
      
      <footer>© 2023 Smart Talent</footer>
    </div>
  )
}