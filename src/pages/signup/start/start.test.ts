import start from "./start.js";
import store from "../../../store.js";
import Vue from "vue";

describe("start.vue", () => {
  beforeEach(() => {
    // store setup
    const project = {
      _id: "faker",
      stories: []
    };
    store.commit("project", project);
    const fakeDB = {
      get: () => {
        return new Promise(resolve => {
          resolve(project);
        });
      },
      put: (prj:any) => {
        return new Promise(resolve => {
          resolve(prj);
        });
      },
      login: (email:any) => {
        return new Promise(resolve => {
          const you = {
            email
          };
          resolve(you);
        });
      },
      signup: (email:any, pw:any) => {
        if (email === "already@have.com") {
          return new Promise((resolve, reject) => {
            reject({
              status: 409,
              reason: "Already have"
            });
          });
        }
        if (email === "bad@things.com") {
          return new Promise((resolve, reject) => {
            reject({
              status: 444,
              reason: "Crazy reasons"
            });
          });
        }
        return new Promise(resolve => {
          console.log("Sign up -");
          console.log('Email -"' + email + '"');
          console.log('Pw    -"' + pw + '"');
          resolve();
        });
      },
      logout: () => {
        return new Promise(resolve => {
          console.log("Log out");
          resolve();
        });
      }
    };
    store.commit("db", fakeDB);
  });

  it("should not allow blank email", () => {
    const create = start.methods.createUser;
    expect(create("", "changeme")).toBe("Missing email");
  });

  it("should not do a rudimentry validation on email", () => {
    const create = start.methods.createUser;
    expect(create("dfffff", "changeme")).toBe("Email looks a bit wrong");
  });

  it("should not allow blank password", () => {
    const create = start.methods.createUser;
    expect(create("what@what.com", "")).toBe("Missing password");
  });

  it("should be able to create user", () => {
    const create = start.methods.createUser;
    create("what@what.com", "ffffff");
    Vue.nextTick(() => {
      console.log("next tick");
      const answer = <any> store.state;
      expect(answer.user.email).toBe("whiat@what.com");
//      expect(store.state.feed.length).toBe(1);
//      expect(store.state.feed[0]).toBe("what@what.com is a new owner");
//      expect(store.state.stages.length).toBe(1);
//      expect(store.state.stages[0].email).toBe("what@what.com");
    });
  });
});
