interface Props {
  label: string;
  value: string;
}

export default function DetailTag({ label, value }: Props) {
  return (
    <div className="flex flex-1 gap-1">
      <p className="text-gray-600">{label}</p>{" "}
      <b className="text-gray-700">{value}</b>
    </div>
  );
}
