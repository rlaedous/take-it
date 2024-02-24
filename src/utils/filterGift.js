export const getfilteredGifts = (gifts, surveyResult) => {
  const filterdGifts = gifts.filter(
    (key) =>
      (key.toGender === surveyResult.gender || key.toGender === 'BOTH') &&
      key.toWhom.includes(surveyResult.whom) &&
      key.ages.includes(surveyResult.age) &&
      key.isPractical === surveyResult.isT &&
      key.price >= surveyResult.money[0] &&
      key.price <= surveyResult.money[1]
  );
  const filteredGiftsWithScore = filterdGifts.map((gift) => {
    let score = 0;
    if (gift.toGender === surveyResult.gender) {
      score += 1;
    }
    if (gift.ages === surveyResult.age) {
      score += 1;
    }
    return { ...gift, score };
  });
  return filteredGiftsWithScore.sort((a, b) => b.score - a.score).splice(0, 3);
};
