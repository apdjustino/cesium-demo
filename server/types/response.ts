export type MaterialResponse<t> = {
  success: boolean;
  message?: string;
  data?: t
}