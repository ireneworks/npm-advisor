"use client";
import PageLayout from "#components/layouts/PageLayout";
import { useSearchParams } from "next/navigation";
import { Textarea } from "#components/shadcn/textarea";
import { Button } from "#components/shadcn/button";
import { useMemo, useState } from "react";
import { useOpenAiMutation } from "#hooks/useOpenAiMutation";
import { buildPrompt } from "#components/checker/_helpers/proptBuilder";
import CodeBlock from "#components/packageDetail/_components/CodeBlock";

interface IResponse {
  result: boolean;
  description: string[];
  suggestVersion: string[];
  otherSuggestion: string[];
  sampleCode: string;
  pros: string[];
  cons: string[];
}

export default function Checker() {
  const [json, setJson] = useState("");

  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package");

  const packageName = decodeURIComponent((packageParam as string) ?? "");

  const prompt = useMemo(() => {
    return buildPrompt({ packageName, json });
  }, [json, packageName]);

  const { trigger, data, isLoading } = useOpenAiMutation();

  const handleClick = async () => {
    if (!json) return null;
    await trigger({
      prompt,
    });
  };

  const {
    result,
    otherSuggestion,
    suggestVersion,
    description,
    sampleCode,
    pros,
    cons,
  } = data || ({} as IResponse);

  return (
    <PageLayout>
      <div className="pt-6 pb-24 px-12">
        <h1 className="font-bold text-4xl">
          Check <div className="text-blue-600 inline-block">{packageName}</div>{" "}
          with my develop environment
        </h1>
        <div>
          <Textarea
            className="max-h-[300px]"
            placeholder="paste package.json"
            onChange={(e) => setJson(e.target.value)}
          />
          <Button
            type="button"
            onClick={handleClick}
            disabled={!json || isLoading}
          >
            Check
          </Button>
        </div>
        {data && (
          <div>
            <p>Result</p>
            {result ? (
              <p>
                Based on your environment, this package should be compatible and
                is likely to work well.
              </p>
            ) : (
              <p>
                This package may not be fully compatible with your current
                environment.
              </p>
            )}
            <div>
              {suggestVersion.map((version: string, index: number) => (
                <p key={index}>{version}</p>
              ))}
            </div>
            <ul className="list-disc">
              {description.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul className="list-disc">
              {pros.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <ul className="list-disc">
              {cons.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {!result && otherSuggestion.length && <p>{otherSuggestion}</p>}
            <CodeBlock>{sampleCode}</CodeBlock>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
