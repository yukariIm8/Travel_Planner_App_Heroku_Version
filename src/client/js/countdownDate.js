// Calculate how soon the trip is
const countdownDate = dept => {
    const deptDate = new Date(dept);
    const currDate = new Date();
    const diffTime = deptDate.getTime() - currDate.getTime();
    const countdown = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return countdown;
};


export { countdownDate }