export type Challenge = {
  id: number;
  emoji: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

export type ChallengeAPIResponse =
  | {
      status: "APPROVED";
      score: number;
      caption: string;
    }
  | {
      status: "REJECTED";
      score: number;
    };
