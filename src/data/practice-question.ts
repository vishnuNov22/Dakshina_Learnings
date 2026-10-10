/**
 * An ORIGINAL practice question written in the UPSC Prelims style for demonstrating
 * elimination technique. It is not a previous-year question.
 */
export const practiceQuestion = {
  label: "Practice question · written in UPSC style (not a PYQ)",
  stem: "With reference to the Seventy-fourth Constitutional Amendment Act, 1992, consider the following statements:",
  statements: [
    "It added the Twelfth Schedule to the Constitution, listing functions that may be devolved to municipalities.",
    "It provides for a State Finance Commission to review the financial position of municipalities.",
    "It makes the creation of Metropolitan Planning Committees mandatory in every district.",
  ],
  question: "Which of the statements given above are correct?",
  options: [
    { key: "a", text: "1 and 2 only", correct: true },
    { key: "b", text: "2 and 3 only", correct: false },
    { key: "c", text: "1 and 3 only", correct: false },
    { key: "d", text: "1, 2 and 3", correct: false },
  ],
  steps: [
    { title: "Anchor the fact you're surest of", body: "The 74th Amendment added the Twelfth Schedule with 18 functional items. Statement 1 is correct — so any option without '1' (option b) can be struck off." },
    { title: "Test the extreme word", body: "Statement 3 says 'mandatory in every district'. Metropolitan Planning Committees are for metropolitan areas (population of ten lakh or more), not every district. Words like 'every' and 'mandatory' deserve suspicion. Statement 3 is incorrect — eliminate (c) and (d)." },
    { title: "Confirm what remains", body: "Article 243Y applies the State Finance Commission (constituted under Article 243-I) to municipalities. Statement 2 is correct. Answer: (a) 1 and 2 only." },
  ],
};
