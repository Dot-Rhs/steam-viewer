const handleStats = (gameInfo, playerStats) => {
  const userStats = (playerStats.value.data.playerstats.stats || [{}]).reduce(
    (acc, val) => {
      if (Object.keys(val).length) {
        acc = { ...acc, [val.name]: val };
      }
      return acc;
    },
    {},
  );

  const allStats = (
    gameInfo.value.data.game.availableGameStats.stats || [{}]
  ).reduce((acc, val) => {
    if (Object.keys(val).length) {
      acc = { ...acc, [val.name]: val };
    }
    return acc;
  }, {});

  const mergedAchievements = mergeObjects(
    playerStats.value.data.playerstats.achievements,
    gameInfo.value.data.game.availableGameStats.achievements,
  );

  const aggregatedAchievements = Object.values(mergedAchievements).reduce(
    (acc, val) => {
      "achieved" in val ? acc.achieved.push(val) : acc.unachieved.push(val);
      return acc;
    },
    { achieved: [], unachieved: [] },
  );

  const mergedStats = mergeObjects(
    playerStats.value.data.playerstats.stats,
    gameInfo.value.data.game.availableGameStats.stats,
  );

  const aggregatedStats = Object.keys(mergedStats).forEach((key) => {
    if (key in userStats) {
      allStats[key] = { ...allStats[key], ...userStats[key] };
    }
  });

  return [aggregatedAchievements, mergedStats];
};

const mergeObjects = (user = [{}], all = [{}]) => {
  const useInfo = user.reduce((acc, val) => {
    if (Object.keys(val).length) {
      acc = { ...acc, [val.name]: val };
    }
    return acc;
  }, {});

  const allInfo = all.reduce((acc, val) => {
    if (Object.keys(val).length) {
      acc = { ...acc, [val.name]: val };
    }
    return acc;
  }, {});

  Object.keys(allInfo).forEach((key) => {
    if (key in useInfo) {
      allInfo[key] = { ...allInfo[key], ...useInfo[key] };
    }
  });

  return allInfo;
};

module.exports = handleStats;
