import { useMemo, useState } from "react";
import { buildPrompt } from "#components/packageDetail/_helpers/promptBuilder";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import { Card, CardContent } from "#components/shadcn/card";
import { useCheckerFetcher } from "#components/packageDetail/_hooks";
import CheckerInput from "../_components/CheckerInput";
import CheckerResult from "#components/packageDetail/_components/CheckerResult";

export default function CheckerContainer() {
  const [json, setJson] = useState("");

  const { trigger, isLoading } = useCheckerFetcher();
  const { packageName, checkerResult } = usePackageDetailStore();

  const isVisible = useMemo(() => {
    return !isLoading && checkerResult;
  }, [checkerResult, isLoading]);
  const prompt = useMemo(() => {
    return buildPrompt({ packageName, json });
  }, [json, packageName]);

  const handleClick = async () => {
    if (!json) return null;
    await trigger({
      prompt,
    });
  };

  return (
    <div className="mt-10 mb-8">
      <Card className="p-6">
        <CardContent className="p-0">
          <CheckerInput
            packageName={packageName}
            json={json}
            setJson={setJson}
            handleClick={handleClick}
            isLoading={isLoading}
          />
          {isVisible && <CheckerResult checkerResult={checkerResult} />}
        </CardContent>
      </Card>
    </div>
  );
}
