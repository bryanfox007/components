const arrayUnique = (arr: any[]) => {
  const u = (value: any, index: any, self: any[]) => {
    return self.indexOf(value) === index;
  };
  return arr.filter(u);
};

export default arrayUnique;
