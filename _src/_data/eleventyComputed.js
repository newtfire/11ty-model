const { execFileSync } = require("node:child_process");

module.exports = {
  gitLastCommit: (data) => {
    try {
      const out = execFileSync(
        "git",
        ["log", "-1", "--format=%cI", "--", data.page.inputPath],
        { encoding: "utf8" }
      ).trim();
      return out || null; // empty if the file isn't committed yet
    } catch {
      return null; // not a git repo, or git isn't available
    }
  }
};
