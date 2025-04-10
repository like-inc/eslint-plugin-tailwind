
const SPACING_WHITELIST = new Set([
  "0",
  "2",
  "4",
  "8",
  "12",
  "16",
  "24",
  "32",
  "48",
  "64",
]);

const spacingRegex = /\b(?:(?:p|m)(?:[trblxy])?|gap|space-[xy])-(\d+)\b/g;

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow non-whitelisted Tailwind spacing values",
      recommended: false,
    },
    messages: {
      invalidSpacing: "Disallowed Tailwind spacing value: {{className}}",
    },
    schema: [], // no options yet
  },

  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name.name !== "className" ||
          !node.value ||
          node.value.type !== "Literal"
        ) {
          return;
        }

        const classString = node.value.value;
        let match;

        while ((match = spacingRegex.exec(classString)) !== null) {
          const spacingValue = match[1];
          if (!SPACING_WHITELIST.has(spacingValue)) {
            context.report({
              node,
              messageId: "invalidSpacing",
              data: {
                className: match[0],
              },
            });
          }
        }
      },
    };
  },
};
