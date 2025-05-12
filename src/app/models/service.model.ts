export interface ServiceModel {
    id?: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    imageUrl?: string | null;
    isActive: boolean;
    createdAt?: any;
  }
  