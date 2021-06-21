import { actions } from "../../src/store/actions";

describe("Store Actions", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          el: { url: "https://thawing-springs-53971.herokuapp.com" },
          node_name: "Test Name",
        }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it("getAllNodes With Success", async () => {
    const commit = jest.fn();
    const block = {
      nodes: {
        list: [
          {
            url: "https://thawing-springs-53971.herokuapp.com",
            online: false,
            name: "Node 1",
            loading: false,
          },
        ],
      },
    };
    const param = block.nodes.list;
    await actions.getAllNodes({ commit }, param);
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenCalledWith("checkNodeStatusStart", param[0]);
    expect(commit).toHaveBeenCalledWith("checkNodeStatusSuccess", {
      el: param[0],
      name: "Test Name",
    });
  });

  it("getAllNodes With failure", async () => {
    const commit = jest.fn();
    fetch.mockImplementationOnce(() => Promise.reject());
    const block = {
      nodes: {
        list: [
          {
            url: "http://localhost:3002",
            online: false,
            name: "Node 4",
            loading: false,
          },
        ],
      },
    };
    const param = block.nodes.list;
    await actions.getAllNodes({ commit }, param);
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenCalledWith("checkNodeStatusStart", param[0]);
    expect(commit).toHaveBeenCalledWith("checkNodeStatusFailure", param[0]);
  });

  it("getNodeBlock With Success", async () => {
    const commit = jest.fn();
    const block = {
      nodes: {
        list: [
          {
            url: "https://thawing-springs-53971.herokuapp.com",
            data: [
              {
                id: "1",
                type: "blocks",
                attributes: {
                  index: 1,
                  timestamp: 1530677153,
                  data: "By reason of these things",
                  "previous-hash":
                    "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
                  hash: "nzl9y9lf4NdSQZCw293n5ICLniP6GnWecWcvAjWKjnc=",
                },
              },
              {
                id: "2",
                type: "blocks",
                attributes: {
                  index: 2,
                  timestamp: 1530677168,
                  data: "then the whaling voyage was welcome",
                  "previous-hash":
                    "nzl9y9lf4NdSQZCw293n5ICLniP6GnWecWcvAjWKjnc=",
                  hash: "oWkTh652fFc89h0PHcBaGB/l/pfsPup75k9hIaI30Kw=",
                },
              },
            ],
          },
        ],
      },
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            el: { url: "https://thawing-springs-53971.herokuapp.com" },
            data: block.nodes.list[0].data,
          }),
      })
    );

    const url = block.nodes.list[0].url;
    await actions.getNodeBlock({ commit }, url);
    console.log("block.nodes.list[0].data", block.nodes.list[0].data);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith("setNodeBlockValues", {
      url,
      data: block.nodes.list[0].data,
    });
  });

  it("getNodeBlock With failure", async () => {
    const commit = jest.fn();
    fetch.mockImplementationOnce(() => Promise.reject("forceError"));
    const url = "https://thawing-springs-53971.herokuapp.com";
    try{
      await actions.getNodeBlock({ commit }, url);
    } catch(e){
      expect(e).toBe("forceError");
    }
  });
});
