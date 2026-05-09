import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/Navigation';
import { ScrollToTop } from '../components/ScrollToTop';

export function AdminLayout() {
  return (
    <main className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
      <ScrollToTop />
      <AdminSidebar />
      <section className="min-w-0 flex-1">
        <Outlet />
      </section>
    </main>
  );
}
