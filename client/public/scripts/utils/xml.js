export const toXml = (obj, rootName = "root") => {
  const process = (value, nodeName) => {
    if (Array.isArray(value)) {
      return value.map((item) => process(item, nodeName)).join("");
    }
    if (typeof value === "object" && value !== null) {
      const children = Object.entries(value)
        .map(([key, val]) => process(val, key))
        .join("");
      return `<${nodeName}>${children}</${nodeName}>`;
    }
    return `<${nodeName}>${String(value ?? "")}</${nodeName}>`;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>${process(obj, rootName)}`;
};
