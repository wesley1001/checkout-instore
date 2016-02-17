x = {
  "shop": [isIdentified, clearOrderFormCookie, getOrderForm],
  "cart": [isIdentified, getOrderForm],
  "orderplaced": [isIdentified],
}

onHandler(nextState, replaceState) {
  _.each(x[nextState.name],(fn) => if(!fn())break;);
}
