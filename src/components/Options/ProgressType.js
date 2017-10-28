import React from "react";
import {
  PROGRESS_TYPE_BREAKDOWN,
  PROGRESS_TYPE_SUMMARY
} from "../../reducers/options";

const ProgressType = ({ value, onChange }) =>
  <div className="col option-progressType">
    <label>
      Progress Type
      <select value={value} onChange={onChange}>
        <option value={PROGRESS_TYPE_BREAKDOWN}>Breakdown</option>
        <option value={PROGRESS_TYPE_SUMMARY}>Summary</option>
      </select>
    </label>
  </div>;

export default ProgressType;
