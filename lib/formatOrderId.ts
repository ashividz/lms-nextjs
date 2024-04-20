export const formatOrderId = (rawId: string): string => {
  // Extract numeric portion from the raw ID
  return `#${rawId}`;
};
