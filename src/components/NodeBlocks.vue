<template>
  <div class="node-block">
    <h2>{{id.padStart(3, '0')}}</h2>
    <div class="block-content">
      {{content}}
    </div>
  </div>
</template>

<script>
export default {
  name: "NodeBlocks",
  props: {
      id: String,
      content: String
  }
};
</script>
<style lang="scss">
@import '@/scss/_variables';

.node-block {
  /* Disabled */
  background: rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  padding: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 4px;

  h2 {
    font-size: 10px;
    line-height: 16px;
    /* identical to box height, or 160% */
    letter-spacing: 1.5px;
    text-transform: uppercase;

    /* Primary Color */
    color: $primaryColor;
  }
  .block-content {
    /* 14 sp • Body 2 */

    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */
    letter-spacing: 0.25px;

    /* Dark Color */
    color: $darkColor;
  }
}
</style>
