import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'junit',
  e2e: {
    'baseUrl': 'http://localhost:4000',
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.*.cy.ts",
  },
});
