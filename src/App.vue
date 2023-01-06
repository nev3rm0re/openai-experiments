<template>
  <div id="app">
    <header>
      <!-- header content goes here -->
      Experiments
    </header>
    <aside>
      List of experiments:
      <nav>
        <router-link to="/">Home</router-link>
        <template v-for="route in $router.options.routes">
          <router-link
            v-bind:key="route.path"
            v-if="route.name !== 'Default'"
            :to="route.path"
            >{{ route.name }}</router-link
          >
        </template>
      </nav>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
