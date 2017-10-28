import React from "react";
import ProgressType from "./ProgressType";

import "./Options.less";

const Options = ({ progressType, onProgressTypeChanged }) =>
  <div className="row auto text-center app-options">
    <ProgressType value={progressType} onChange={onProgressTypeChanged} />
  </div>;

export default Options;
