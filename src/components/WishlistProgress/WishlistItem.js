import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function formatProgressText(item) {
  if (item.required === undefined) {
    return null;
  }
  return item.owned + " / " + item.required;
}

function formatProgressPercent(progress) {
  return Math.floor(progress * 1000) / 10 + "%";
}

const ItemName = ({ item, gameData }) => {
  let name;
  if (item.itemId) {
    let itemData = gameData.items[item.itemId];
    if (itemData) {
      name = itemData.name;
    }
  } else if (item.currencyId) {
    let currencyData = gameData.currencies[item.currencyId];
    if (currencyData) {
      name = currencyData.name;
    }
  } else {
    name = item.name;
  }

  let className = "item-name";
  if (!name) {
    name = "Unknown";
    className += " unknown";
  }

  if (item.substitutionFor) {
    let substitutionData = gameData.items[item.substitutionFor];
    if (substitutionData) {
      name += " => " + substitutionData.name;
    }
  }

  return (
    <div className={className}>
      {name}
    </div>
  );
};

const ProgressSummary = ({ item }) =>
  <div className="progress-summary">
    {formatProgressPercent(item.progress)}
  </div>;

const ItemComponents = ({ item, gameData }) => {
  if (!item.components) {
    return null;
  }

  return (
    <div className="item-components">
      {item.components.map((inner, idx) =>
        <WishlistItem key={idx} item={inner} gameData={gameData} />
      )}
    </div>
  );
};

const WishlistItem = ({ item, gameData }) => {
  let progressBar;
  if (item.itemProgress !== undefined && item.itemProgress < item.progress) {
    progressBar = (
      <ProgressBar
        primaryProgress={item.itemProgress}
        secondaryProgress={item.progress}
        text={formatProgressText(item)}
      />
    );
  } else {
    progressBar = (
      <ProgressBar
        primaryProgress={item.progress}
        text={formatProgressText(item)}
      />
    );
  }

  return (
    <div className="item-progress">
      <div className="item-details">
        <ProgressSummary item={item} />
        <ItemName item={item} gameData={gameData} />
      </div>
      {progressBar}
      <ItemComponents item={item} gameData={gameData} />
    </div>
  );
};

export default WishlistItem;
