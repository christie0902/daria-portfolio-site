export interface Art {
  _id: string;
  category: 'sketch-painting' | 'digital' | 'photography' | 'sculpture';
  title: string;
  description: string;
  images: string[];
  featured: boolean;
  medium?: string | null; // Nullable medium property
  dimension?: string | null; // Nullable dimension property
}