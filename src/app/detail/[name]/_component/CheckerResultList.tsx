interface Props {
  label: string;
  items: string[];
}

export default function CheckerResultList({ label, items }: Props) {
  if (!items.length) return null;

  return (
    <>
      <p className="text-sm font-bold mt-4">{label}</p>
      <ul className="list-disc pl-5">
        {items?.map((item: string, index: number) => (
          <li key={index} className="text-sm">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
