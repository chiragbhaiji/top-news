export const popTopArticles = ({from, count, shouldRandomize = false}) => {
  const copy = [...from];
  let topArticles = copy.splice(0, count);

  if (shouldRandomize) {
    randomize(topArticles);
  }

  return {
    top: topArticles,
    remaining: copy,
  };
};

const randomize = array => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};
