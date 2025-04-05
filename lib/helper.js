export const serializedCarData = (carData, wishlisted = false) => {
  return {
    ...carData,
    price: carData.price ? parseFloat(carData.price.toString()) : 0,
    createdAt: carData.createdAt.toISOString(),
    updatedAt: carData.updatedAt.toISOString(),
    wishlisted: wishlisted,
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
