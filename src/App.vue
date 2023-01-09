<template>
  <el-container>
    <el-header>
      <indicator @click="handleOpenApiKeyModal" key="API_KEY" />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleMenuSelect">
          <el-menu-item v-for="route in routes" :key="route.path" :index="route.path">
            {{ route.name }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import Indicator from './components/KeyIndicator.vue';

export default {
  name: 'App',
  components: {
    Indicator,
  },
  data() {
    return {
      apiKey: '',
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
  methods: {
    handleMenuSelect(path) {
      this.$router.push(path);
    },
    handleOpenApiKeyModal(requestBody) {
      console.log("Calling handleOpenApiKeyModal", requestBody);
      this.$prompt('Enter API Key', 'API Key', {
        confirmButtonText: 'Save',
        cancelButtonText: 'Delete',
        inputPattern: /^[a-zA-Z0-9-]*$/,
        inputErrorMessage: 'API Key can only contain letters and numbers',
      }).then(({ value }) => {
        localStorage.setItem('API_KEY', value);
        this.apiKey = value;
      }).catch(() => {
        localStorage.removeItem('API_KEY');
        this.apiKey = '';
      });
    },
  },
  created() {
    this.apiKey = localStorage.getItem('apiKey');
  },
};
</script>
<style src="element-ui/lib/theme-chalk/index.css"></style>
<style>
:root {
  --color-primary: #409EFF;
  --primary-color: #409EFF;
}
</style>
<style src="element-ui/lib/theme-chalk/display.css"></style>
