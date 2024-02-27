export const getTimeDifferenceString = (pastDate) => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  if (timeDifference < minute) {
    const seconds = Math.round(timeDifference / 1000);
    return `${seconds}초 전`;
  } else if (timeDifference < hour) {
    const minutes = Math.round(timeDifference / minute);
    return `${minutes}분 전`;
  } else if (timeDifference < day) {
    const hours = Math.round(timeDifference / hour);
    return `${hours}시간 전`;
  } else if (timeDifference < month) {
    const days = Math.round(timeDifference / day);
    return `${days}일 전`;
  } else {
    const months = Math.round(timeDifference / month);
    return `${months}달 전`;
  }
};
