import { mapKeys } from "../../utility/object";

function mapCollectionToProgress(collection) {
  return mapKeys(collection, (value, key) => ({
    id: key,
    owned: value.count,
    allocated: 0
  }));
}

function hasCompletedAchievement(recipe, achievements) {
  if (recipe.achievementId === undefined) {
    return false;
  }

  let achievement = achievements[recipe.achievementId];
  if (!achievement) {
    return false;
  }

  if (achievement.done) {
    return true;
  }

  if (recipe.achievementBitFlag === undefined) {
    return false;
  }

  return (
    achievement.bits && achievement.bits.indexOf(recipe.achievementBitFlag) > -1
  );
}

function calculateProgress(
  iterator,
  wishlist,
  availableResources,
  achievements
) {
  return wishlist
    .map(o => iterator(o, availableResources, achievements))
    .filter(o => !!o);
}

function allocateResourceItem(resourceItem, resourceCollection, key) {
  let result = {
    [key]: resourceItem[key],
    required: resourceItem.count,
    substitutionFor: resourceItem.substitutionFor
  };

  let ownedResource = resourceCollection[resourceItem[key]];
  if (ownedResource) {
    let availableCount = ownedResource.owned - ownedResource.allocated;
    let allocatedToResult = Math.min(availableCount, result.required);

    result.owned = allocatedToResult;

    ownedResource.allocated += allocatedToResult;
  } else {
    result.owned = 0;
  }

  return result;
}

export {
  calculateProgress,
  mapCollectionToProgress,
  hasCompletedAchievement,
  allocateResourceItem
};
