import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// api 에서 넘어오는 필드명이 answer // s 붙지 않음
export type QuestionState = Question & { answer: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  // await fetch(endpoint)의 return 은 Response 객체
  // await 으로 감싸지 않으면 Promise 접근할 수 없음
  const data = await (await fetch(endpoint)).json();

  console.log(data);
  return data.results.map((question: Question) => ({
    ...question,
    answer: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
