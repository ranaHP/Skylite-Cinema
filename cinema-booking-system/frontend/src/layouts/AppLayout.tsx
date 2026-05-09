import { Outlet } from 'react-router-dom';
import { BottomNav, TopNav } from '../components/Navigation';
import { ScrollToTop } from '../components/ScrollToTop';

export function AppLayout() {
  return (
    <div className="mobile-app-shell">
      <ScrollToTop />
      <TopNav />
      <main className="mobile-page min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
