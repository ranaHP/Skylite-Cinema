import { useQuery } from '@tanstack/react-query';
import { cinemas, food, movies, shows } from '../data';
const pause = <T,>(value: T) => new Promise<T>((resolve) => setTimeout(() => resolve(value), 180));
export const useMovies = () => useQuery({ queryKey: ['movies'], queryFn: () => pause(movies) });
export const useCinemas = () => useQuery({ queryKey: ['cinemas'], queryFn: () => pause(cinemas) });
export const useShows = () => useQuery({ queryKey: ['shows'], queryFn: () => pause(shows) });
export const useFood = () => useQuery({ queryKey: ['food'], queryFn: () => pause(food) });
