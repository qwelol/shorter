exports.createPagination = (page, maxPage, spreadSymbol, spread) => {
  let list = [];
  let shiftStart = Math.max(page - spread, 2);
  let shiftEnd = Math.min(page + spread, maxPage - 1);
  if (shiftEnd < spread * 2) {
    shiftEnd = Math.min(spread * 2, maxPage - 1);
  }
  if (shiftEnd === maxPage - 1 && shiftStart > 3) {
    shiftStart = Math.max(3, Math.min(maxPage - spread * 2 + 1, shiftStart));
  }
  list.push(1);
  if (shiftStart == 3) {
    list.push(2);
  } else {
    if (shiftStart > 3) {
      list.push(spreadSymbol);
    }
  }
  for (let i = shiftStart; i <= shiftEnd; i++) {
    list.push(i);
  }
  let lastPage = maxPage - 1;
  if (shiftEnd === lastPage - 1) {
    list.push(lastPage);
  } else {
    if (shiftEnd < lastPage) {
      list.push(spreadSymbol);
    }
  }
  if (maxPage !== 1) {
    list.push(maxPage);
  }
  return list;
};
