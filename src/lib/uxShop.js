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

export function uxTrimStringToMaxLength(str, maxLength=200) {
  // Used for failover, we are now handling this via CSS if supported in (modern) browsers
  if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
  }
  return str;
}
