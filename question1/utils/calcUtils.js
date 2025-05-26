export const calculateAverage = (arr) => {
  const sum = arr.reduce((a, b) => a + b, 0);
  return Number((sum / arr.length).toFixed(2));
};

export const calculateCorrelation = (X, Y) => {
  if (X.length !== Y.length || X.length < 2) return 0;

  const avgX = calculateAverage(X);
  const avgY = calculateAverage(Y);

  const numerator = X.reduce((sum, x, i) => sum + ((x - avgX) * (Y[i] - avgY)), 0);
  const denominatorX = Math.sqrt(X.reduce((sum, x) => sum + Math.pow(x - avgX, 2), 0));
  const denominatorY = Math.sqrt(Y.reduce((sum, y) => sum + Math.pow(y - avgY, 2), 0));

  const correlation = numerator / (denominatorX * denominatorY);
  return Number(correlation.toFixed(4));
};
