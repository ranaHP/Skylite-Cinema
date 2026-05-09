import { AdminSidebar } from '../components/Navigation';
import { PageTransition } from '../components/PageTransition';
import { ScrollToTop } from '../components/ScrollToTop';

export function AdminLayout() {
  return (
    <main className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
      <ScrollToTop />
      <AdminSidebar />
      <PageTransition className="min-w-0 flex-1" />
    </main>
  );
}
