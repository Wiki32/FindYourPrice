export const toCSV = (rows = []) => {
  if (!Array.isArray(rows) || !rows.length) return "";
  return rows
    .map((row) =>
      row
        .map((cell = "") => {
          const safe = String(cell).replace(/"/g, '""');
          return `"${safe}"`;
        })
        .join(",")
    )
    .join("\n");
};
