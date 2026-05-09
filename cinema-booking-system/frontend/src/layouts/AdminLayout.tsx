import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/Navigation';
export function AdminLayout(){return <main className="mx-auto flex max-w-7xl gap-6 px-4 py-6"><AdminSidebar/><section className="min-w-0 flex-1"><Outlet/></section></main>}
