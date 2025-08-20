import { Textarea } from "#components/shadcn/textarea";
import { Button } from "#components/shadcn/button";
import { Loader2Icon } from "lucide-react";

interface Props {
  packageName: string;
  json: string;
  setJson: (value: string) => void;
  handleClick: () => void;
  isLoading?: boolean;
}

export default function CheckerInput({
  packageName,
  json,
  setJson,
  handleClick,
  isLoading,
}: Props) {
  return (
    <>
      <h1 className="font-bold text-xl mb-3">
        Get advice for{" "}
        <span className="text-indigo-500 inline-block">{packageName}</span> in
        my development environment.
      </h1>
      <div className="flex flex-col gap-2">
        <Textarea
          className="max-h-[200px]"
          placeholder="Paste package.json"
          value={json}
          onChange={(e) => setJson(e.target.value)}
        />
        <div>
          <Button
            type="button"
            onClick={handleClick}
            disabled={!json || isLoading}
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            Get advice
          </Button>
        </div>
      </div>
    </>
  );
}
