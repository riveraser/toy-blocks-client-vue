export const actions = {
  async getAllNodes({ commit }, nodeList) {
    for (const el of nodeList) {
      await commit("checkNodeStatusStart", el);

      try {
        const res = await fetch(`${el.url}/api/v1/status`);
        const response = await res.json();
        const params = {
          el,
          name: response.node_name,
        };
        await commit("checkNodeStatusSuccess", params);
      } catch (e) {
        await commit("checkNodeStatusFailure", el);
      }
    }
  },
  async getNodeBlock({ commit }, url) {
    try {
      const res = await fetch(`${url}/api/v1/blocks`);
      const response = await res.json();
      const params = {
        url,
        data: response.data,
      };
      await commit("setNodeBlockValues", params);
    } catch (e) {
      console.log(e);
      throw (e);
    }
  },
};
