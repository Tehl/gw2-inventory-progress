function getAchievements(dataService) {
  return dataService.getAchievements().then(res => {
    return {
      achievements: res.reduce((data, current) => {
        data[current.id] = {
          id: current.id,
          done: current.done,
          bits: current.bits || []
        };
        return data;
      }, {})
    };
  });
}

export { getAchievements };
