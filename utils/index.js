export const shuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};
