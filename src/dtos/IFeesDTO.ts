export interface IFeesDTO {
  id: string;

  lawyers1: string;
  lawyers2: string;
  lawyers3: string;
  lawyers4: string;

  clients: string;

  group_action: string;

  opposing_party: string;

  value1: string;
  value2: string;
  value3: string;
  value4: string;

  totalValue?: string;

  status: string;

  endDate: Date;

  payment_date: Date;
}