describe("ILE Score Analyzer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should load the main page and display the correct title", () => {
    cy.contains("ILE Score Analyzer").should("be.visible");
  });

  it("should show error if score is not provided", () => {
    cy.get("input#average").type("85");
    cy.get("input#top30\\%\\ average").type("90");
    cy.contains("Analyze Score").click();

    cy.contains("Score is required").should("be.visible");
  });

  it("should show error if average is not provided", () => {
    cy.get("input#your_score").type("75");
    cy.get("input#top30\\%\\ average").type("90");
    cy.contains("Analyze Score").click();

    cy.contains("Average is required").should("be.visible");
  });

  it("should show error if top 30% average is not provided", () => {
    cy.get("input#your_score").type("75");
    cy.get("input#average").type("85");
    cy.contains("Analyze Score").click();

    cy.contains("Top 30% average is required").should("be.visible");
  });

  it("should show error if score is not a valid number", () => {
    cy.get("input#your_score").type("105");
    cy.get("input#average").type("85");
    cy.get("input#top30\\%\\ average").type("90");
    cy.contains("Analyze Score").click();

    cy.contains("Score cannot exceed 100").should("be.visible");
  });

  it("should show error if average is greater than or equal to top 30% average", () => {
    cy.get("input#your_score").type("75");
    cy.get("input#average").type("90");
    cy.get("input#top30\\%\\ average").type("85");
    cy.contains("Analyze Score").click();

    cy.contains("The average must be lower than the top 30% average").should(
      "be.visible"
    );
  });

  it("should show success message when all inputs are valid", () => {
    cy.get("input#your_score").type("75");
    cy.get("input#average").type("85");
    cy.get("input#top30\\%\\ average").type("90");
    cy.contains("Analyze Score").click();

    cy.contains("Score analyzed successfully!").should("be.visible");
  });

  it("should display Unsupported Yet in the Multi tab", () => {
    cy.contains("Multiple Scores").click();
    cy.contains("Unsupported Yet").should("be.visible");
  });
});
describe("ILE Score Analyzer - Error Handling Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Next.js 로컬 서버 URL
  });

  // 유효성 검사 오류 메시지 목록
  const errorMessages = [
    "Score is required",
    "Average is required",
    "Top 30% average is required",
    "Score must be an integer",
    "Score must be at least 0",
    "Score cannot exceed 100",
    "Average must have at most two decimal places",
    "Top 30% average must have at most two decimal places",
    "The average must be lower than the top 30% average",
  ];

  it("should display two random errors correctly", () => {
    // 무작위로 두 가지 오류 선택
    const randomErrors = Cypress._.sampleSize(errorMessages, 2);

    // 첫 번째 오류 발생 조건 설정
    if (randomErrors.includes("Score is required")) {
      // 점수를 입력하지 않음
      cy.get("input#your_score").clear();
    } else {
      cy.get("input#your_score").type("105"); // 점수를 100보다 크게 입력
    }

    // 두 번째 오류 발생 조건 설정
    if (randomErrors.includes("Average is required")) {
      // 평균을 입력하지 않음
      cy.get("input#average").clear();
    } else {
      cy.get("input#average").type("95");
    }

    if (randomErrors.includes("Top 30% average is required")) {
      // 상위 30% 평균을 입력하지 않음
      cy.get("input#top30\\%\\ average").clear();
    } else if (
      randomErrors.includes(
        "The average must be lower than the top 30% average"
      )
    ) {
      cy.get("input#top30\\%\\ average").type("90");
      cy.get("input#average").clear;
    }
  });
});
