import { cache } from "react";

const getTrooperPageContent = cache(async () =>
  (await fetch("https://www.trooper.be/nl/trooperverenigingen/hp")).text()
);

export const getTrooperCommissionStatus = cache(async () => {
  const trooperPageContent = await getTrooperPageContent();
  const match = trooperPageContent.match(
    /\\"commissionSum\\":([\d.]+),\\"goal\\":(\d+)/
  );

  if (!match) {
    return Promise.reject(new Error("Failed to parse Trooper status"));
  } else {
    try {
      const [, commissionSum, goal] = match;

      const earned = parseFloat(commissionSum);
      const target = parseInt(goal, 10);
      const percentage = (earned / target) * 100;

      return {
        earned,
        target,
        percentage,
        isGoalReached: earned >= target
      };
    } catch (error) {
      return Promise.reject(new Error("Failed to parse Trooper status"));
    }
  }
});
