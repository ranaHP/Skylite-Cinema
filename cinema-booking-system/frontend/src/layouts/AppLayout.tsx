import { Outlet } from 'react-router-dom';
import { BottomNav, TopNav } from '../components/Navigation';
export function AppLayout(){return <><TopNav/><main className="mx-auto min-h-screen max-w-7xl px-4 pb-28 md:pb-10"><Outlet/></main><BottomNav/></>}
