module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.claude/worktrees/"],
  transformIgnorePatterns: ["/node_modules/(?!figlet/importable-fonts/)"],
  moduleNameMapper: {
    ".(css|less|scss)$": "identity-obj-proxy",
  },
};
