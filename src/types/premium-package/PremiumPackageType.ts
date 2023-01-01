type PremiumPackageType = {
  id: string;
  active: boolean;
  code: string;
  price: number;
  numberOfMonths: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export default PremiumPackageType;
