import { getQueryParam } from "../common/utils";

describe("getQueryParam", () => {
  it("should return the first element of the array if param is an array", () => {
    // Given
    const param = ["first", "second"];

    // When
    const result = getQueryParam(param);

    // Then
    expect(result).toBe("first");
  });

  it("should return the param itself if it is a string", () => {
    // Given
    const param = "testParam";

    // When
    const result = getQueryParam(param);

    // Then
    expect(result).toBe("testParam");
  });

  it("should return an empty string if param is an empty array", () => {
    // Given
    const param: string[] = [];

    // When
    const result = getQueryParam(param);

    // Then
    expect(result).toBe("");
  });

  it("should return an empty string if param is undefined", () => {
    // Given
    const param = undefined;

    // When
    const result = getQueryParam(param);

    // Then
    expect(result).toBe("");
  });
});
