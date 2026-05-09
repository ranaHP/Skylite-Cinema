import { Outlet } from 'react-router-dom';
import { BottomNav, TopNav } from '../components/Navigation';
import { PageTransition } from '../components/PageTransition';
import { ScrollToTop } from '../components/ScrollToTop';

export function AppLayout() {
  return (
    <div className="mobile-app-shell">
      <ScrollToTop />
      <TopNav />
      <PageTransition className="mobile-page min-h-screen">
        <Outlet />
      </PageTransition>
      <BottomNav />
    </div>
  );
}
