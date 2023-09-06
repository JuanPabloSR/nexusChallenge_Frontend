export interface MerchandiseCreate {
  productName?:    string;
  quantity?:       number;
  entryDate?:      Date;
  registeredById?: number;
}
export interface MerchandiseEdit {
  id: number;
  productName?: string;
  quantity?:    number;
  entryDate?:   Date;
  editedById?:  number;
}
