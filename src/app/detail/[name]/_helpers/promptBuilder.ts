import { promptTemplate } from "../detail.constant";

interface Props {
  packageName: string;
  json: string;
}

export function buildPrompt({ packageName, json }: Props): string {
  return promptTemplate
    .replace("{package}", packageName)
    .replace("{json}", json);
}
