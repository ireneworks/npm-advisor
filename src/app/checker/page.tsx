"use client";
import PageLayout from "#components/layouts/PageLayout";
import { useSearchParams } from "next/navigation";
import { Textarea } from "#components/shadcn/textarea";
import { Button } from "#components/shadcn/button";
import { Label } from "#components/shadcn/label";
import { useMemo, useState } from "react";
import { useOpenAiMutation } from "#hooks/useOpenAiMutation";

export default function Checker() {
  const [json, setJson] = useState("");

  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package");

  const packageName = decodeURIComponent((packageParam as string) ?? "");

  const prompt = useMemo(() => {
    let formattedJson = json;
    try {
      const parsed = JSON.parse(json);
      formattedJson = JSON.stringify(parsed, null, 2);
    } catch (e) {
      console.warn("Invalid JSON, sending raw text");
    }

    return (
      packageName +
      "를 도입하려고 고려하고 있어, 내 개발환경은" +
      formattedJson +
      "다음과 같은데 호환이 잘 되는지 사용 가능하다면 몇 버젼을 사용해야하는지 알려줘"
    );
  }, [json, packageName]);

  const { trigger, data, isLoading } = useOpenAiMutation();

  const handleClick = async () => {
    await trigger({
      prompt,
    });
  };

  return (
    <PageLayout>
      <div className="pt-6 pb-24 px-12">
        <h1 className="font-bold text-4xl">
          Check <div className="text-blue-700 inline-block">{packageName}</div>{" "}
          with my develop environment
        </h1>
        <div>
          <Label htmlFor={"packageJsonFile"}>package.json</Label>
          <Textarea
            className="max-h-[300px]"
            placeholder="paste package.json"
            onChange={(e) => setJson(e.target.value)}
          />
        </div>
        <Button type="button" onClick={handleClick} disabled={isLoading}>
          Check
        </Button>
        <p>Result</p>
        <p>{data.result}</p>
        <p>
          Based on your environment, this package should be compatible and is
          likely to work well.
        </p>
        <p>부연설명</p>
        <p>
          This package may not be fully compatible with your current
          environment.
        </p>
        <p>다른 제안</p>
        <p>샘플코드</p>
      </div>
    </PageLayout>
  );
}
