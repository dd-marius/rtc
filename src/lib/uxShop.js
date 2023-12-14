export function uxShowCategoryName(type) {
  if (type == 1) {
    return "ceai";
  } else if (type == 2) {
    return "cafea";
  } else {
    return "";
  }
}

export function uxShowPriceMin(value) {
  // Price per kg/ sold on 100g increments
  return value/10;
}
