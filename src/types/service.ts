export interface GalleryImage {
  image: string;
  caption?: string;
}

export interface Service {
  id?: number;
  icon: string;
  title: string;
  description: string;
  image?: string;
  gallery_images?: GalleryImage[];
}
