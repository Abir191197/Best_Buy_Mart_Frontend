// Define the ShopStatus type
export type ShopStatus = "ACTIVE" | "PENDING" | "INACTIVE";

// Define the ShopT interface
export interface ShopT {
  shopId: string;
  name: string;
  description: string;
  status: ShopStatus;
  logoImgPath: string;
}


export interface FormInputs {
  name: string;
  description: string;
  logoImgPath: FileList;
}

export interface CreateShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  shopLimitReached: boolean;
}