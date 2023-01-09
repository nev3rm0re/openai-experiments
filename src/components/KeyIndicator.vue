<template>
  <div class="indicator" @click="$emit('click')">
    <i
      :class="['fa', 'fa-hdd-o', { set: apiKeySet, 'not-set': !apiKeySet }]"
    ></i>
    <span :class="{ set: apiKeySet, 'not-set': !apiKeySet }"
      >API Key is {{ apiKeySet ? "set" : "not set" }}</span
    >
  </div>
</template>
<script>
export default {
  name: "Indicator",
  props: {
    storageKey: {
      type: String,
      default: "API_KEY"
    }
  },
  data() {
    return {
      apiKey: "",
      apiKeySet: false
    };
  },
  created() {
    this.apiKey = localStorage.getItem(this.storageKey);
    this.apiKeySet = !!this.apiKey;
  }
};
</script>
<style>
.indicator {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.indicator i {
  margin-right: 10px;
}

.indicator .set {
  color: #0f0;
}

.indicator .not-set {
  color: #f00;
}
</style>
