(function (e) {
  e.MSIMEDict = class MSIMEDict {
    constructor(input) {
      this.input = input;
    }

    parse() {
      let input = this.input;
      let comments = [];
      let entries = [];
      let lines = input.split("\n").filter((x) => !!x);
      for (let i in lines) {
        const x = lines[i];
        if (x.startsWith("!")) {
          comments.push({
            column: +i,
            description: x.slice(1),
          });
        } else {
          const x = lines[i].split("\t");
          entries.push({
            read: x[0],
            word: x[1],
            type: x[2],
            dict: x[3],
            column: +i,
          });
        }
      }
      return {
        comments,
        entries,
      };
    }

    json() {
      const parsed = this.parse(this.input);
      const dict = {};
      let x = [];
      for (let entry of parsed.entries) {
        if (entry.column >= parsed.comments[0].column) {
          dict["$comment" + parsed.comments[0].column] =
            parsed.comments.shift().description;
          x.push(entry);
          continue;
        }
        dict[entry.read] = entry.word;
      }
      for (let y of x) {
        dict[y.read] = y.word;
      }
      for (let comment of parsed.comments) {
        dict["$comment" + comment.column] = comment.description;
      }
      return dict;
    }
  };
})(
  typeof exports === "object" && typeof module !== "undefined"
    ? module.exports
    : this
);

