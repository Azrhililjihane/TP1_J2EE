export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface CustomerResponse {
  _embedded: {
    customers: Customer[];
  };
  _links: any;
  page: any;
}

export interface ProductResponse {
  _embedded: {
    products: Product[];
  };
  _links: any;
  page: any;
}

export interface Bill {
  id: number;
  billingDate: Date;
  customerID: number;
  productItems?: ProductItem[];
  customer:Customer | null;
}
export interface ProductItem {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  bill: Bill | null;
  product: Product | null;
  productName: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
