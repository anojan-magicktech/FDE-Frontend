export interface Testimonial {
  id: string | number;
  name: string;
  role?: string;
  description: string;
  rating: number;
  platform?: string;
  photo?: string | null;
}
