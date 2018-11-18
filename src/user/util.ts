const service = {
  cleanUser: user => {
    const clean = service.fresh();
    for (let key in clean) {
      clean[key] = user[key];
    }
    clean.name = user.name;
    return clean;
  },
  fresh: () => {
    const metadata = {
      nick: "",
      role: "",
      birthday: "",
      skills: [],
      asperations: [],
      days: [],
      holidays: [],
      owner: false
    };
    return metadata;
  }
};

export default service;
