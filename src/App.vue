<template>
  <div class="app">
    <header class="navbar is-dark">
      <key-indicator class="navbar-end" @click="showAPIKeyModal" />
    </header>
    <div class="app-body">
      <aside class="menu">
        <ul class="menu-list">
          <li
            v-for="route in $router.options.routes"
            :key="route.name"
            v-if="route.name"
          >
            <router-link :to="route.path" class="is-active">{{
              route.name
            }}</router-link>
          </li>
        </ul>
      </aside>
      <main>
        <router-view />
      </main>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal" :class="{'is-active': showModal}">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Enter OpenAI API Key</p>
            <button class="delete" aria-label="close" @click="showModal = false"></button>
          </header>
          <section class="modal-card-body">
            <form @submit.prevent="submitAPIKey">
              <div class="field">
                <label class="label" for="api-key-input">API Key</label>
                <div class="control">
                  <input class="input" type="text" id="api-key-input" v-model="apiKey" ref="apiKeyInput" />
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" type="button" @click="submitAPIKey">Submit</button>
            <button class="button is-text" type="button" @click="deleteAPIKey">Delete</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import KeyIndicator from "./components/KeyIndicator.vue";

export default {
  name: "App",
  components: {
    KeyIndicator
  },
  data() {
    return {
      apiKey: "",
      showModal: false
    };
  },
  methods: {
    showAPIKeyModal() {
      this.apiKey = localStorage.getItem("API_KEY") || "";
      this.showModal = true;
      this.$nextTick(() => {
        this.$refs.apiKeyInput.focus();
      });
    },
    submitAPIKey() {
      localStorage.setItem("API_KEY", this.apiKey);
      this.showModal = false;
    },
    deleteAPIKey() {
      localStorage.removeItem("API_KEY");
      this.showModal = false;
    }
  },
  created() {
    if (!localStorage.getItem("API_KEY")) {
      this.showAPIKeyModal();
    }
  }
};
</script>
<style>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-body {
  display: flex;
  height: 100%;
}

.menu {
  flex: 0 0 200px;
  background-color: #333;
  color: #fff;
}

.menu-list > li > a {
  display: block;
  padding: 20px;
  font-size: 18px;
  color: #fff;
  text-decoration: none;
}

.menu-list > li > a.is-active {
  background-color: #444;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #eee;
}
</style>
