import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { HomePage } from '../pages/HomePage';
import { MoviesPage, MovieDetailsPage } from '../pages/MoviePages';
import { BookingPage } from '../pages/BookingPage';
import { CheckoutPage, ConfirmationPage } from '../pages/CheckoutPages';
import { CinemasPage, ProfilePage, TicketsPage } from '../pages/ProfileTicketsPages';
import {
  AdminBookings,
  AdminContent,
  AdminCustomers,
  AdminDashboard,
  AdminFiles,
  AdminMovies,
  AdminSettings,
  AdminShows,
} from '../pages/AdminPages';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/movies', element: <MoviesPage /> },
      { path: '/movies/:id', element: <MovieDetailsPage /> },
      { path: '/booking/:movieId', element: <BookingPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/confirmation', element: <ConfirmationPage /> },
      { path: '/cinemas', element: <CinemasPage /> },
      { path: '/tickets', element: <TicketsPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'movies', element: <AdminMovies /> },
      { path: 'shows', element: <AdminShows /> },
      { path: 'bookings', element: <AdminBookings /> },
      { path: 'customers', element: <AdminCustomers /> },
      { path: 'content', element: <AdminContent /> },
      { path: 'files', element: <AdminFiles /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
]);
