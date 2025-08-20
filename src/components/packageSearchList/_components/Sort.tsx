import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/shadcn/select";

export default function Sort() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="relevant">Most Relevant</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="updated">Recently Updated</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
