<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <h1>GPT-3 Completions</h1>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Prompt">
              <el-input
                type="textarea"
                v-model="form.prompt"
                :autosize="{ minRows: 10, maxRows: 20 }"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Submit</el-button>
              <el-button @click="onReset">Reset</el-button>
              <el-button
                type="text"
                @click="advancedSettings = !advancedSettings"
                >{{ advancedSettings ? "Hide" : "Show" }} advanced
                settings</el-button
              >
            </el-form-item>
            <el-form-item v-if="advancedSettings">
              <el-form-item label="Model">
                <el-select v-model="form.model" placeholder="Please select">
                  <el-option
                    v-for="model in models"
                    :key="model"
                    :label="model"
                    :value="model"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Max tokens">
                <el-input v-model.number="form.max_tokens"></el-input>
              </el-form-item>
              <el-form-item label="Temperature">
                <el-slider
                  v-model.number="form.temperature"
                  :min="0"
                  :max="0.9"
                  :step="0.1"
                ></el-slider>
              </el-form-item>
              <el-form-item label="Top P">
                <el-input v-model="form.top_p"></el-input>
              </el-form-item>
              <el-form-item label="N">
                <el-input v-model.number="form.n"></el-input>
              </el-form-item>
              <el-form-item label="Presence penalty">
                <el-input v-model="form.presence_penalty"></el-input>
              </el-form-item>
              <el-form-item label="Frequency penalty">
                <el-input v-model="form.frequency_penalty"></el-input>
              </el-form-item>
              <el-form-item label="Stop">
                <el-input v-model="form.stop"></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <pre><code>{{ response }}</code></pre>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Experiment3",
  data() {
    return {
      advancedSettings: false,
      response: "",
      models: ["code-davinci-002", "code-cushman-001", "text-davinci-003"],
      form: {
        prompt: "",
        model: "text-davinci-003",
        max_tokens: 50,
        temperature: 0.7,
        top_p: 0.9,
        n: 2,
        presence_penalty: 0.65,
        frequency_penalty: 0.4,
        stop: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.response = "";
          this.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onReset() {
      this.$refs.form.resetFields();
    },
    async submit() {
      const formData = new FormData();
      formData.append("prompt", this.form.prompt);
      formData.append("max_tokens", this.form.max_tokens);
      formData.append("temperature", this.form.temperature);
      formData.append("top_p", this.form.top_p);
      formData.append("n", this.form.n);
      formData.append("presence_penalty", this.form.presence_penalty);
      formData.append("frequency_penalty", this.form.frequency_penalty);
      formData.append("stop", this.form.stop);

      this.form.stream = true;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("API_KEY")}`
      };

      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers,
        body: JSON.stringify(this.form)
      });
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // slice off the "data: " prefix
        const decodedValue = new TextDecoder("utf-8").decode(value);
        // split decoded value by "\n\n" for individual "data:" parts
        const parts = decodedValue
          .split("\n\n")
          // map over the parts and remove the "data: " prefix
          .map(part => part.slice(5))
          // filter out empty parts
          .filter(part => part.length > 0)
          .forEach(part => {
            console.log('Processing part: ');
            console.dir(part);
            if (part === "[DONE]") {
              return;
            }
            try {
              const decodedObject = JSON.parse(part);
              this.response += decodedObject.choices[0].index == 1 ? decodedObject.choices[0].text : '';
            } catch (e) {
              console.log("Error parsing part", part);
            }
          });
      }
    }
  }
};
</script>

<style scoped>
/* pre {
  white-space: pre-wrap;
} */
</style>
