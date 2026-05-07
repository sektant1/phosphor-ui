module.exports = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/(?!figlet/importable-fonts/)"],
  moduleNameMapper: {
    ".(css|less|scss)$": "identity-obj-proxy",
  },
};
