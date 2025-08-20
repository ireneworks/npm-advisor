import { DETAIL } from "#constants/navigation";
import { Card, CardContent } from "#components/shadcn/card";
import { useRouter } from "next/navigation";

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
      className={"cursor-pointer py-2.5"}
      onClick={() => push(DETAIL + "/" + encodeURIComponent(packageName))}
    >
      <CardContent className={"px-3.5"}>
        <h2 className={"font-bold text-gray-900"}>{packageName}</h2>
        <p className="text-gray-700 text-sm mb-2 truncate">{description}</p>
        <div className={"flex gap-2 text-sm"}>
          <p className="text-gray-700">{version}</p>
          <p className="text-gray-300"> | </p>
          <p className="text-gray-700">{date}</p>
          <p className="text-gray-300"> | </p>
          <p className="text-gray-700">Monthly Downloads {monthlyDownloads}</p>
        </div>
      </CardContent>
    </Card>
  );
}
