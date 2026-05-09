import { create } from 'zustand';
interface UiState { darkMode: boolean; bookingTimeout: number; toggleDarkMode: () => void; setBookingTimeout: (seconds: number) => void; }
export const useUiStore = create<UiState>((set) => ({ darkMode: true, bookingTimeout: 420, toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })), setBookingTimeout: (bookingTimeout) => set({ bookingTimeout }) }));
