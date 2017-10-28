import { getRequiredData } from "./wishlist/requiredData";
import {
  mapCollectionToProgress,
  calculateProgress
} from "./wishlist/progress";
import { processBreakdownItem } from "./wishlist/progressBreakdown";
import { processSummaryItem } from "./wishlist/progressSummary";

const calculateProgressBreakdown = calculateProgress.bind(
  undefined,
  processBreakdownItem
);

const calculateProgressSummary = calculateProgress.bind(
  undefined,
  processSummaryItem
);

export {
  getRequiredData,
  mapCollectionToProgress,
  calculateProgressBreakdown,
  calculateProgressSummary
};
