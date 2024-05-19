export interface Art {
    _id: string;
    category: 'sketch-painting' | 'digital' | 'photography' | 'sculpture';
    title: string;
    description: string;
    images: string[];
    featured: boolean;
  }