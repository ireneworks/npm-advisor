import { Loader2Icon } from "lucide-react";
import Button from "../../base/Button";
import Textarea from "../../base/Textarea";

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
      <h1 className="text-gray-900 text-base font-bold mb-3 lg:text-xl">
        Get advice for{" "}
        <span className="text-indigo-500 inline-block">{packageName}</span> in
        my development environment.
      </h1>
      <div className="flex flex-col gap-2">
        <Textarea
          className="text-sm max-h-[100px] lg:max-h-[200px] lg:text-base"
          placeholder="Paste package.json"
          value={json}
          onChange={(e) => setJson(e.target.value)}
        />
        <div>
          <Button
            type="button"
            size="md"
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
