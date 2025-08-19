import { Card, CardContent } from "#components/shadcn/card";
import CodeBlock from "#components/packageDetail/_components/CodeBlock";
import { ICheckerResponse } from "#components/packageDetail/packageDetail.interface";
import { useMemo } from "react";

interface Props {
  checkerResult: ICheckerResponse;
}

export default function CheckerResult({ checkerResult }: Props) {
  const {
    result,
    cons,
    otherSuggestion,
    suggestVersion,
    pros,
    sampleCode,
    description,
  } = useMemo(() => {
    return checkerResult;
  }, [checkerResult]);

  return (
    <Card className="mt-6 p-6">
      <CardContent className="p-0">
        <p className="text-xl font-bold mb-6">Result</p>
        {result === true && (
          <p className="text-sm">
            👍 Based on your environment, this package should be compatible and
            is likely to work well.
          </p>
        )}
        {result === false && (
          <p className="text-sm">
            👎 This package may not be fully compatible with your current
            environment.
          </p>
        )}

        {result === null ? (
          <p className="text-sm">Make sure to provide a proper package.json.</p>
        ) : (
          <>
            {suggestVersion?.length > 0 && (
              <div className="flex items-center mt-4 gap-1.5">
                <p className="text-sm">Suggest Version</p>
                <div>
                  {suggestVersion.map((version: string, index: number) => (
                    <p key={index} className="font-bold text-sm">
                      {version}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm font-bold mt-4">Description</p>
            <ul className="list-disc pl-5">
              {description?.map((item: string, index: number) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-sm font-bold mt-4">✅ Pros</p>
            <ul className="list-disc pl-5">
              {pros?.map((item: string, index: number) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-sm font-bold mt-4">⚠️ Cons</p>
            <ul className="list-disc pl-5">
              {cons?.map((item: string, index: number) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>

            {!result && otherSuggestion?.length && (
              <div>
                <p className="text-sm font-bold mt-4">Other Suggestions</p>
                <ul className="list-disc pl-5">
                  {otherSuggestion?.map((item: string, index: number) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-sm font-bold mt-4">Sample Code</p>
            <CodeBlock>{sampleCode}</CodeBlock>
          </>
        )}
      </CardContent>
    </Card>
  );
}
