<template>
  <form class="box is-size-4" @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label" for="model">Model</label>
      <div class="control">
        <div class="select">
          <select id="model" v-model="requestBody.model">
            <option v-for="model in models" :key="model">{{ model }}</option>
          </select>
        </div>
      </div>
      <p class="help">The ID of the model to use for the completion.</p>
    </div>
    <div class="field">
      <label class="label" for="prompt">Prompt</label>
      <div class="control">
        <textarea
          class="textarea"
          id="prompt"
          v-model="requestBody.prompt"
        ></textarea>
      </div>
      <p class="help">
        The prompt to generate completions for, encoded as a string or array of
        strings.
      </p>
    </div>
    <div class="field">
      <label class="label" for="max_tokens">Max Tokens</label>
      <div class="control">
        <input
          class="input"
          id="max_tokens"
          type="number"
          v-model.number="requestBody.max_tokens"
        />
      </div>
      <p class="help">
        The maximum number of tokens to generate in the completion. Valid range:
        1-1024.
      </p>
    </div>
    <div class="field">
      <label class="label" for="temperature">Temperature</label>
      <div class="control">
        <input
          class="input"
          id="temperature"
          type="number"
          v-model.number="requestBody.temperature"
        />
      </div>
      <p class="help">
        What [sampling
        temperature](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277)
        to use. Higher values means the model will take more risks. Try 0.9 for
        more creative applications, and 0 (argmax sampling) for ones with a
        well-defined answer.
      </p>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-primary" type="submit">Submit</button>
      </div>
    </div>
  </form>
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

<style>
.box {
  margin-top: 20px;
}
</style>
