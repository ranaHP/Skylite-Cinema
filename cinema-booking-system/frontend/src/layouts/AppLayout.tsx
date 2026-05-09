import { Outlet } from 'react-router-dom';
import { BottomNav, TopNav } from '../components/Navigation';

export function AppLayout() {
  return (
    <div className="mobile-app-shell">
      <TopNav />
      <main className="mobile-page min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
