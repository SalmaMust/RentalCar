export default interface IVoiture {
  _id?: string; 
  matricule: string;
  name: string;
  model: string;
  type: string;
  disponibilite: string;
  pricePerDay: number;
  visibility: boolean;
  deposit: number;
  tax_fees: number;
  min_days: number;
}