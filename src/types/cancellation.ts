export type CancellationStatus =
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'completed';

export type CancellationRequest = {
  id: string;
  orderId: string;
  reason: string;
  date: string;
  status: CancellationStatus;
};