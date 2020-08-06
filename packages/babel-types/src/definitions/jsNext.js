import defineType from "./utils";

defineType("DestructureNumberPattern", {
  fields: {},
  visitor: ["left", "right"],
});
