import { DETAIL } from "#constants/navigation";
import { useRouter } from "next/navigation";
import { ArrowDownToLine } from "lucide-react";
import Card from "#components/base/Card";

interface Props {
  packageName: string;
  description: string;
  version: string;
  date: string;
  monthlyDownloads: string;
}

export default function ListItem({
  packageName,
  description,
  version,
  date,
  monthlyDownloads,
}: Props) {
  const { push } = useRouter();

  return (
    <Card
      key={packageName}
      className={
        "cursor-pointer hover:shadow-sm px-4 py-2.5 lg:py-3 lg:rounded-md"
      }
      onClick={() => push(DETAIL + "/" + encodeURIComponent(packageName))}
    >
      <h2 className={"font-bold text-gray-900 text-lg mb-1 lg:text-2xl"}>
        {packageName}
      </h2>
      <p className="text-gray-700 truncate mb-4 text-sm lg:mb-5 lg:text-base">
        {description}
      </p>
      <div className={"flex flex-wrap gap-2 text-[12px] lg:text-sm"}>
        <p className="text-gray-700">{version}</p>
        <p className="text-gray-300"> | </p>
        <p className="text-gray-700">{date}</p>
        <p className="text-gray-300"> | </p>
        <div className="text-gray-700 flex flex-wrap items-center gap-1">
          <ArrowDownToLine className={"size-3 stroke-gray-500"} />{" "}
          {monthlyDownloads}
        </div>
      </div>
    </Card>
  );
}
