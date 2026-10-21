import { eslintCompatPlugin } from "@oxlint/plugins";

import { noPhysicalSidesRule } from "./rules/no-physical-sides.ts";

/** Magio's own lint rules, run by `oxlint.config.ts`. */
const magioPlugin = eslintCompatPlugin({
  meta: { name: "magio" },
  rules: {
    "no-physical-sides": noPhysicalSidesRule,
  },
});

export default magioPlugin;
