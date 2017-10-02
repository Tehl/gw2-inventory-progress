import React from "react";

import "./ProgressBar.less";

function formatProgressPercent(progress) {
  return Math.floor(progress * 1000) / 10 + "%";
}

const ProgressBarInner = ({ progress, className }) => {
  let classNames = ["progress-bar"];
  if (className) {
    classNames.push(className);
  }
  if (progress === 1) {
    classNames.push("complete");
  }

  return (
    <div
      className={classNames.join(" ")}
      style={{ width: formatProgressPercent(progress) }}
    />
  );
};

const ProgressBar = ({ primaryProgress, secondaryProgress, text }) => {
  let bars = [
    <ProgressBarInner
      key="primary"
      progress={primaryProgress}
      className="progress-primary"
    />
  ];

  if (secondaryProgress !== undefined) {
    bars.push(
      <ProgressBarInner
        key="secondary"
        progress={secondaryProgress}
        className="progress-secondary"
      />
    );
  }

  return (
    <div className="progress-container">
      {bars}
      <div className="progress-text">
        {text}
      </div>
    </div>
  );
};

export default ProgressBar;
