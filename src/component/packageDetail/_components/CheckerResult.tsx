import { useMemo } from "react";
import { ICheckerResponse } from "../../packageDetail/packageDetail.interface";
import CheckerResultList from "../../packageDetail/_components/CheckerResultList";
import Card from "../../base/Card";

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
    <Card className="text-gray-900 mt-6 p-4 lg:p-6">
      <p className="text-xl font-bold mb-6">Package Insights</p>
      {result === true && (
        <p className="text-sm">
          👍 Based on your environment, this package should be compatible and is
          likely to work well.
        </p>
      )}
      {result === false && (
        <p className="text-sm">
          👎 This package may not be fully compatible with your current
          environment.
        </p>
      )}

      {result === null ? (
        <p className="text-sm">
          ⚠️ Make sure to provide a proper package.json.
        </p>
      ) : (
        <>
          {suggestVersion?.length > 0 && (
            <div className="flex-col mt-4 gap-1.5">
              <CheckerResultList
                label={"Suggest Version"}
                items={suggestVersion}
              />
            </div>
          )}
          <CheckerResultList label={"Description"} items={description} />
          <CheckerResultList label={"✅ Pros"} items={pros} />
          <CheckerResultList label={"⚠️ Cons"} items={cons} />
          {!result && (
            <CheckerResultList
              label={"Other Package Suggestions"}
              items={otherSuggestion}
            />
          )}
          <p className="text-sm font-bold mt-4">Sample Code</p>
          <p>{sampleCode}</p>
        </>
      )}
    </Card>
  );
}
