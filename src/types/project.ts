import type { GalleryImage } from './service';

export interface ProjectServiceType {
  title: string;
}

export interface Project {
  id?: number;
  title: string;
  status?: 'Completed' | 'In Process' | string;
  location?: string;
  date?: string;
  main_image?: string;
  main_description?: string;
  description?: string;
  client?: string;
  client_review?: string;
  client_rating?: number;
  gallery_images?: GalleryImage[];
  service_type_details?: ProjectServiceType;
}
