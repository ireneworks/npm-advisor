import { promptTemplate } from "#components/checker/chcker.constant";

type BuildPromptParams = {
  packageName: string;
  json: string;
};

export function buildPrompt({ packageName, json }: BuildPromptParams): string {
  return promptTemplate
    .replace("{package}", packageName)
    .replace("{json}", json);
}
