<template>
  <div class="experiment-1">
    <div class="messages">
      <!-- message area -->
    </div>
    <completions-prompt
      v-if="localStorageSet"
      @promptSubmitted="handlePromptSubmitted"
    />
  </div>
</template>

<template>
  <el-container>
    <el-header>
      <h1>Completion Form</h1>
    </el-header>
    <el-main>
      <completion-form @prompt-submitted="handlePromptSubmitted" />
    </el-main>
  </el-container>
</template>

<script>
import CompletionForm from "../CompletionsPrompt.vue";

export default {
  name: "Experiment1",
  components: {
    CompletionForm
  },
  data() {
    return {
      localStorageSet: false,
      showModal: false,
      apiKey: ""
    };
  },
  mounted() {
    this.localStorageSet = !!localStorage.getItem("API_KEY");
  },
  methods: {
    submitAPIKey() {
      if (this.apiKey) {
        localStorage.setItem("API_KEY", this.apiKey);
        this.localStorageSet = true;
        this.showModal = false;
      }
    },
    deleteAPIKey() {
      localStorage.removeItem("API_KEY");
      this.localStorageSet = false;
      this.showModal = false;
    },
    submitMessage() {
      // submit message logic here
      if (!this.localStorageSet) {
        this.showModal = true;
      }
    },
    handlePromptSubmitted(requestBody) {
      console.log(requestBody);
    }
  }
};
</script>
