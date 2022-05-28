export type Material = {
  id: string;
  color?: string;
  cost?: number;
  deliverDate?: string;
  name?: string;
  totalCost?: string;
  volume?: number;
}

export type MaterialResponse<t> = {
  success: boolean;
  message?: string;
  data?: t
}

export type RequestById = {
  id: string;
}