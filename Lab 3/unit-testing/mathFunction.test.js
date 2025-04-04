const { sinh, cosh, tanh } = require("./mathFunctions");

describe("sinh function", () => {
  test("sinh(0) should be 0", () => {
    expect(sinh(0)).toBe(0);
  });

  test("sinh(1) should be approximately 1.175", () => {
    expect(sinh(1)).toBeCloseTo(1.175, 3);
  });

  test("sinh(-1) should be approximately -1.175", () => {
    expect(sinh(-1)).toBeCloseTo(-1.175, 3);
  });

  test("sinh(2) should be approximately 3.626", () => {
    expect(sinh(2)).toBeCloseTo(Math.sinh(2), 3);
  });
  
  test("sinh(-2) should be approximately -3.626", () => {
    expect(sinh(-2)).toBeCloseTo(Math.sinh(-2), 3);
  });
  
});

describe("cosh function", () => {
  test("cosh(0) should be 1", () => {
    expect(cosh(0)).toBe(1);
  });

  test("cosh(1) should be approximately 1.543", () => {
    expect(cosh(1)).toBeCloseTo(1.543, 3);
  });

  test("cosh(-1) should be approximately 1.543", () => {
    expect(cosh(-1)).toBeCloseTo(1.543, 3);
  });

  test("cosh(2) should be approximately 3.762", () => {
    expect(cosh(2)).toBeCloseTo(3.762, 3);
  });

  test("cosh(-2) should be approximately 3.762", () => {
    expect(cosh(-2)).toBeCloseTo(3.762, 3);
  });
});

describe("tanh function", () => {
  test("tanh(0) should be 0", () => {
    expect(tanh(0)).toBe(0);
  });

  test("tanh(1) should be approximately 0.761", () => {
    expect(tanh(1)).toBeCloseTo(0.761, 2);
  });
  

  test("tanh(-1) should be approximately -0.761", () => {
    expect(tanh(-1)).toBeCloseTo(-0.761, 2);
  });

  test("tanh(2) should be approximately 0.964", () => {
    expect(tanh(2)).toBeCloseTo(0.964, 3);
  });

  test("tanh(-2) should be approximately -0.964", () => {
    expect(tanh(-2)).toBeCloseTo(-0.964, 3);
  });
});
