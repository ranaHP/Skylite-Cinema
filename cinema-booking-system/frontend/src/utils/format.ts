export const money = (value: number, currency = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
export const shortDate = (date: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date));
