import { useRouter } from "next/navigation";
import { HOME } from "#constant/navigation";
import Button from "../base/Button";

export default function Error() {
  const { replace } = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold">npm Advisor</h1>
        <p className="text-2xl font-bold">Something went wrong.</p>
        <p className="text-gray-600">Please try again later.</p>
        <Button type="button" onClick={() => void replace(HOME)}>
          Go to home
        </Button>
      </div>
    </div>
  );
}
