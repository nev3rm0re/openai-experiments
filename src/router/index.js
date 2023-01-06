import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
// populate files array with all the files in the experiments folder
const files = require.context("@/components/experiments", false, /\.vue$/);
const fileNames = files.keys().map(key => {
  return files(key).default.name;
});

const generatedRoutes = fileNames.map(file => ({
  path: `/${file.toLowerCase()}`,
  name: file,
  component: () => import(`@/components/experiments/${file}.vue`)
}));

const router = new Router({
  routes: generatedRoutes
});

export default router;
