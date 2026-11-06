const SHORT_COURSE = /short|quick/i;
const POPULAR_COURSE = /web development|programming|python|javascript|react|artificial intelligence|\bai\b|data science|machine learning|cyber ?security|ui\s*\/?\s*ux|cloud computing/i;

const discounted = (amount, explicitDiscount) => {
  const amountNumber = Number(amount) || 0;
  const discountNumber = Number(explicitDiscount) || 0;
  return discountNumber > 0 && discountNumber < amountNumber
    ? discountNumber
    : Math.round((amountNumber * 0.75) / 100) * 100;
};

export const getCoursePricing = (course) => {
  const source = typeof course?.toObject === "function" ? course.toObject() : course || {};
  const category = `${source.category || ""} ${source.title || ""}`;
  const isShortCourse = SHORT_COURSE.test(category);
  const isPopular = !isShortCourse && POPULAR_COURSE.test(category);

  const originalPrice = isShortCourse
    ? 0
    : Number(source.price) > 0
      ? Number(source.price)
      : isPopular
        ? 12000
        : 0;

  const currentPrice = isShortCourse
    ? 0
    : isPopular
      ? discounted(originalPrice, source.discountPrice)
      : Number(source.discountPrice) > 0 && Number(source.discountPrice) < originalPrice
        ? Number(source.discountPrice)
        : originalPrice;

  const certificateFree = isShortCourse
    || source.certificateFree === true
    || (source.certificatePrice !== null && source.certificatePrice !== undefined && Number(source.certificatePrice) === 0);
  const certificateOriginalPrice = certificateFree
    ? 0
    : Number(source.certificatePrice) > 0
      ? Number(source.certificatePrice)
      : isPopular
        ? 2000
        : 1000;
  const certificateCurrentPrice = certificateFree
    ? 0
    : isPopular
      ? discounted(certificateOriginalPrice, source.certificateDiscountPrice)
      : Number(source.certificateDiscountPrice) > 0 && Number(source.certificateDiscountPrice) < certificateOriginalPrice
        ? Number(source.certificateDiscountPrice)
        : certificateOriginalPrice;

  return {
    isShortCourse,
    isPopular,
    originalPrice,
    currentPrice,
    discountAmount: Math.max(originalPrice - currentPrice, 0),
    certificateFree,
    certificateOriginalPrice,
    certificateCurrentPrice,
    certificateDiscountAmount: Math.max(certificateOriginalPrice - certificateCurrentPrice, 0),
  };
};

export const presentCourse = (course) => {
  const source = typeof course?.toObject === "function" ? course.toObject() : course || {};
  return { ...source, pricing: getCoursePricing(source) };
};
