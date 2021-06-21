<template>
  <v-expansion-panel
    class="accordion-node"
    ref="expansionpanel"
    @change="onChange"
  >
    <v-expansion-panel-header>
      <div class="d-flex">
        <div class="d-flex flex-column">
          <span class="accordion-header-name">{{ node.name }}</span>
          <span class="accordion-header-url">{{ node.url }}</span>
        </div>
        <v-badge
          class="accordion-badge"
          left
          bordered
          dot
          inline
          :color="getColor"
        >
          <span class="text-uppercase accordion-status-text">{{
            getStatusText
          }}</span>
        </v-badge>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div v-if="isLoading">
        <v-progress-linear 
      indeterminate
    ></v-progress-linear>
        <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
      </div>
      <div v-else>
        <div v-if="getBlocks(this.node.url).data">
          <node-blocks
            v-for="block in getBlocks(this.node.url).data"
            :key="block.id"
            :id="block.id"
            :content="block.attributes.data"
          ></node-blocks>
        </div>
        <div v-else>
          <v-alert type="error">
            No blocks were found
          </v-alert>
        </div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import NodeBlocks from "./NodeBlocks.vue";
import { mapActions, mapGetters } from "vuex";

import sassVariables from "@/scss/_variables.scss";

export default {
  name: "node",
  components: {
    NodeBlocks,
  },
  props: {
    node: {
      url: String,
      online: Boolean,
      name: String,
      loading: Boolean,
    },
  },
  data: () => ({
    isLoading: true,
  }),
  mounted() {
    console.log("ok");
  },
  methods: {
    ...mapActions(["getNodeBlock"]),
    async onChange() {
      if (this.isOpen) {
        this.isLoading = true;
        try {
          await this.getNodeBlock(this.node.url);
        } catch (e) {
          console.log(e);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getBlocks"]),
    isOpen() {
      return !this.$refs.expansionpanel.isActive;
    },
    getColor() {
      let badgeColor = sassVariables.red;// "#Eb5757";

      if (this.node.online) {
        badgeColor = sassVariables.green;// "#18cc55";
      }
      return badgeColor;
    },
    getStatusText() {
      let statusText = "Loading";

      if (!this.node.loading) {
        if (this.node.online) {
          statusText = "Online";
        } else {
          statusText = "Offline";
        }
      }
      return statusText;
    },
  },
};
</script>

<style scoped>
.accordion-badge {
  margin-left: auto;
  margin-right: 12px;
  margin-top: 1px;
}
.accordion-header-name {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #263238;
}

.accordion-header-url {
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.25px;
  color: #263238;
  opacity: 0.54;
}

.accordion-status-text {
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 1.5px;
  color: #263238;
}
</style>

<style>
.accordion-node .v-expansion-panels--accordion {
  padding-bottom: 12px;
}

.accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
  height: 6px;
  margin-top: 18px;
  width: 6px;
}
.v-expansion-panel-content__wrap{
  padding: 0 13px 12px !important;

}

@media only screen and (max-width: 442px) {
  .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
    margin-top: 28px;
  }
}
</style>
