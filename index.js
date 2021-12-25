const { MSIMEDict } = require("./lib");
const { writeFileSync, readFileSync } = require("fs");
writeFileSync(
  "ime.json",
  JSON.stringify(new MSIMEDict(readFileSync("ime.txt", "utf8")).json(), null, 2)
);