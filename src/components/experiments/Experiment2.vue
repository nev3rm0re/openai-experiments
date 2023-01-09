<template>
  <div>
    <el-form @submit.prevent="submitForm">
      <el-form-item label="API Key">
        <el-input v-model="apiKey"></el-input>
      </el-form-item>
      <el-form-item label="Model ID">
        <el-input v-model="modelId"></el-input>
      </el-form-item>
      <el-form-item label="Input">
        <el-input
          v-model="input"
          type="textarea"
          :rows="4"
          :autosize="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="Instruction">
        <el-input
          v-model="instruction"
          type="textarea"
          :rows="4"
          :autosize="true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="toggleAdvancedSettings">
          {{ advancedSettingsVisible ? "Hide" : "Show" }} Advanced
          Settings</el-button
        >
      </el-form-item>
      <el-form-item v-if="advancedSettingsVisible">
        <el-form-item label="Number of Edits">
          <el-input-number v-model="n" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="Temperature">
          <el-input-number
            v-model="temperature"
            :min="0"
            :max="1"
            :step="0.1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="Top P">
          <el-input-number
            v-model="topP"
            :min="0"
            :max="1"
            :step="0.1"
          ></el-input-number>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
      </el-form-item>
    </el-form>
    <transition name="fade">
      <div v-if="response" id="response">
        <pre><code>{{ response && response.choices && response.choices.length && response.choices[0].text }}</code></pre>
      </div>
    </transition>
  </div>
</template>
<script>
// Extracts data: values and JSON parses them
const extractJsonData = value => {
  const decodedValue = new TextDecoder().decode(value);
  return (
    decodedValue
      .split("\n\n")
      .map(value => {
        if (value.startsWith("data:")) {
          const json = value.substring(6);
          if (json == "[DONE]") {
            return;
          }
          const data = JSON.parse(json) || null;
          return data;
        }
      })
      // filter empty values
      .filter(value => value)
  );
};

export default {
  name: "Experiment2",
  data() {
    return {
      apiKey: localStorage.getItem("API_KEY") || "",
      modelId: "text-davinci-edit-001",
      input: "",
      instruction: "",
      n: 1,
      temperature: 0.5,
      topP: 0.9,
      advancedSettingsVisible: false,
      response: "Response should appear here..."
    };
  },
  methods: {
    toggleAdvancedSettings() {
      this.advancedSettingsVisible = !this.advancedSettingsVisible;
    },
    submitForm() {
      var requestBody = {
        model: this.modelId,
        input: this.input,
        instruction: this.instruction,
        n: this.n,
        temperature: this.temperature,
        top_p: this.topP,
      };
      const endpoint = "https://api.openai.com/v1/edits";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody),
        mode: "cors"
      };

      const response = fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.response = data;
        });
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
