// Calculate trip length
const countTripLength = (dept, retn) => {
  const deptDate = new Date(dept);
  const retnDate = new Date(retn);
  const diffTime = retnDate.getTime() - deptDate.getTime();
  const countdown = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return countdown;
};


export { countTripLength }