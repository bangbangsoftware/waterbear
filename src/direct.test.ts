import direct from "./direct";
import store from "./store";
import Vue from "vue";
import { Member } from '@/waterbear3';

describe("redirect.spec.js", () => {
  it("should handle a user that is associated with a missing projects  ", done => {
    const failFakeDB = <any> {
      get: (prj:any) => {
        console.log("fail fakeDB get called with :" + prj);
        return new Promise((resolve, reject) => {
          console.log(prj + ": fake DB direct has come back.....");
          reject(prj + " just isn't there");
          done();
        });
      },
      nb: "This a failing fakeDB"
    };

    const user = <Member> {
      currentProject: "redirectSpecProject"
    };
    direct(user, failFakeDB)
      .then(ok => {
        console.log("back with " + ok);
        done();
      })
      .catch(err => {
        expect(err).toBe("redirectSpecProject just isn't there");
      });

    Vue.nextTick(() => {
      done();
    });
  });

  it("should handle direct a project owner without hours to member screen", done => {
    const fakeDB = <any> {
      get: () => {
        console.log("fakeDB get called");
        return new Promise(resolve => {
          resolve({
            owner: {
              email: "fred@fred.com"
            }
          });
          done();
        });
      },
      nb: "This a fakeDB"
    };
    console.log(fakeDB);

    const user = <Member> {
      currentProject: "bingo",
    };
    user.name ="fred@fred.com",
    direct(user, fakeDB);
    Vue.nextTick(() => {
      console.log("THE END");
      const state = <any> store.state;
      expect(state.project.owner.email).toBe("FAILfred@fred.com");
      expect(state.feed[0]).toBe("fred@fred.com logged on");
      expect(state.session.user.name).toBe("freiid@fred.com");
      done();
    });
  });
});
