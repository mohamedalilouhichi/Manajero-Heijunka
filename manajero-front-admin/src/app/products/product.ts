import {ProductionPlan} from '../planning/productionplan';
import {Orders} from '../algorithm/Orders';


export interface Product {
  idProduct?: string;
  productName: string;
  productCode: string;
  productCategory: string;
  productDate: Date;
  totalquantity?: number;
  takttime?: number;
  DailyProductionGoal?: number;
  weeklyDemand?: number;
  archived?: boolean;
  productionPlan?: ProductionPlan;
  orders?: Orders[];
}
