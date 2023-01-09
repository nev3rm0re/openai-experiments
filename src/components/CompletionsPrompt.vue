<template>
  <el-form ref="form" label-width="120px" @submit.native.prevent="handleSubmit">
    <el-form-item label="Prompt">
      <el-input
        v-model="requestBody.prompt"
        type="textarea"
        rows="2"
      ></el-input>
      <p></p>
      <el-row>
        <el-col :span="8">
          <el-form-item label="Model">
            <el-select v-model="requestBody.model" placeholder="Select a model">
              <el-option
                v-for="model in models"
                :key="model"
                :label="model"
                :value="model"
              ></el-option>
            </el-select>
            <p class="help">The ID of the model to use for the completion.</p>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Max Tokens">
            <el-input-number
              v-model.number="requestBody.max_tokens"
              :min="1"
              :max="1024"
            ></el-input-number>
            <p class="help">
              The maximum number of tokens to generate in the completion. Valid range:
              1-1024.
            </p>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Temperature">
            <el-input-number
              v-model.number="requestBody.temperature"
              :min="0"
              :max="1"
              :step="0.1"
            ></el-input-number>
            <p class="help">
              What [sampling
              temperature](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277)
              to use. Higher values means the model will take more risks. Try 0.9 for
              more creative applications, and 0 (argmax sampling) for ones with a
              well-defined answer.
            </p>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  name: "CompletionForm",
  props: ["onPromptSubmitted"],
  data() {
    return {
      requestBody: {
        model: "",
        prompt: "",
        max_tokens: 0,
        temperature: 0
      },
      models: ["text-davinci-002", "text-babbage-001", "text-curie-001"]
    };
  },
  methods: {
    handleSubmit() {
      this.onPromptSubmitted(this.requestBody);
    }
  }
};
</script>

<style scoped>
.help {
  font-size: 12px;
  color: #999;
}

.el-input, .help {
  line-height: 1;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
