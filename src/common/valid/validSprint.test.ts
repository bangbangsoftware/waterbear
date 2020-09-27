import sprint from "./validSprint";

describe("validSprint.test.js: calculating days from a date", () => {
  it("Should be tell the difference between one day", () => {
    const dateOne = new Date(2018, 7, 21, 10, 0, 0, 0);
    const dateTwo = new Date(2018, 7, 22, 10, 0, 0, 0);
    const days = sprint.howManyDays(dateOne + "", dateTwo);
    expect(days).toBe(1);
  });

  it("Should be tell the difference between 12 day", () => {
    const dateOne = new Date(2018, 7, 21, 10, 0, 0, 0);
    const dateTwo = new Date(2018, 8, 2, 10, 0, 0, 0);
    const days = sprint.howManyDays(dateOne + "", dateTwo);
    expect(days).toBe(12);
  });

  it("Should be tell the difference between a year", () => {
    const dateOne = new Date(2019, 7, 21, 10, 0, 0, 0);
    const dateTwo = new Date(2018, 7, 21, 10, 0, 0, 0);
    const days = sprint.howManyDays(dateOne + "", dateTwo);
    expect(days).toBe(365);
  });

  it("Should be tell the difference between 0 day", () => {
    const dateOne = new Date(2018, 7, 21, 10, 0, 0, 0);
    const dateTwo = new Date(2018, 7, 21, 10, 0, 0, 0);
    const days = sprint.howManyDays(dateOne + "", dateTwo);
    expect(days).toBe(0);
  });
});

describe("validSprint.test.js: The summary text of a sprint", () => {
  const date = new Date(2018, 7, 22, 10, 0, 0, 0);
  const now = new Date(2018, 7, 21, 10, 0, 0, 0);

  it("Should be handle a empty sprint", () => {
    const mockSprint = {};
    const summary = <any> sprint.invalid(mockSprint);
    expect(summary.state).toBe("The sprint is not defined yet");
    expect(summary.description).toBe("Nothing in the sprint");
  });

  it("Should be handle a undefined sprint", () => {
    const mockSprint = undefined;
    const summary =<any>  sprint.invalid(mockSprint);
    expect(summary.state).toBe("The sprint is not defined yet");
    expect(summary.description).toBe("Nothing in the sprint");
  });

  it("Should be handle a null sprint", () => {
    const mockSprint = null;
    const summary =<any>  sprint.invalid(mockSprint);
    expect(summary.state).toBe("The sprint is not defined yet");
    expect(summary.description).toBe("Nothing in the sprint");
  });

  it("Should be handle a sprint with no start date", () => {
    const task = {};
    const story = {
      tasks: [task]
    };
    const mockSprint = {
      list: [story]
    };
    const summary =<any>  sprint.invalid(mockSprint, now);
    expect(summary.state).toBe("The sprint has not started yet");
  });

  it("Should be handle a sprint started with no story lists", () => {
    const mockSprint = {
      startDate: date
    };
    const summary =<any>  sprint.invalid(mockSprint, now);
    expect(summary.state).toBe("The sprint is not defined yet");
    expect(summary.description).toBe("No stories in the sprint");
  });

  it("Should be handle a sprint started with no stories", () => {
    const mockSprint = {
      startDate: date,
      list: []
    };
    const summary =<any>  sprint.invalid(mockSprint, now);
    expect(summary.state).toBe("The sprint is not defined yet");
    expect(summary.description).toBe("No stories in the sprint");
  });

  it("Should be handle a sprint started with no tasks", () => {
    const story = {};
    const mockSprint = {
      startDate: date,
      list: [story]
    };
    const summary =<any>  sprint.invalid(mockSprint, now);
    expect(summary.state).toBe("The sprint is not defined yet");
    expect(summary.description).toBe("No tasks in the stories");
  });

  it.only("Should be handle a sprint started with still no tasks", () => {
    const story = {
      tasks: []
    };
    const mockSprint = {
      startDate: date,
      list: [story]
    };
    console.log(mockSprint);

    const summary =<any>  sprint.invalid(mockSprint, now);
    expect(summary.state).toBe("The sprint is not defined yet");
    expect(summary.description).toBe("No tasks in the stories");
  });

  it("Should be handle a sprint started with still no tasks started", () => {
    const five = new Date(2018, 7, 26, 10, 0, 0, 0);
    const task = {
      id: 10
    };
    const story = {
      tasks: [task]
    };
    const mockSprint = {
      startDate: five,
      list: [story]
    };
    const summary =<any>  sprint.invalid(mockSprint, now);
    expect(summary.state).toBe("The sprint has a false start");
    expect(summary.description).toBe(
      "It started 5 days ago but no task have started yet"
    );
  });
});
