export const randomize = array => {
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

export const sortPinnedArticles = (a, b) => {
  if (a.isPinned && b.isPinned) return 0;
  if (a.isPinned) return -1;
  if (b.isPinned) return 1;
};
