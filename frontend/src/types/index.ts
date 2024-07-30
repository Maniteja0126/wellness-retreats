
export interface Retreat {
    id: number;
    title: string;
    image: string;
    description: string;
    location: string;
    price: number;
    date:number;
    type: string;
    tag: string[];
  }
  
  export interface BookingResponse {
    success: boolean;
    message: string;
  }
  
  export interface ApiError {
    message: string;
  }
  