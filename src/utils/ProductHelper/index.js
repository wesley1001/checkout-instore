class ProductHelper {
  calculateTotalPrice(products) {
    if(products.length === 0) return 0;

    return products
      .map(product => (product.price * product.quantity) / 100)
      .reduce((acc, item) => acc + item);
  }

  formatPrice(price) {
    return (price.toFixed(2)).replace('.', ',');
  }

  getSelectedPayment(installmentOptions, selectedPaymentId) {
    return installmentOptions.filter(item => item.paymentSystem === selectedPaymentId.toString())[0];
  }
}

export default new ProductHelper();
