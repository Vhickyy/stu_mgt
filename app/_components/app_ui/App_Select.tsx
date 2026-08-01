import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ISelect {
  data: { label: string; key: string }[];
  value: string;
  name?: string;
  placeholder: string;
  title?: string;
  style?: string;
  onChange: (val: string) => void;
}

const App_Select = ({
  data,
  value,
  placeholder,
  title,
  onChange,
  style,
}: ISelect) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <div className={cn("grid bg-white", style)}>
        <label>{title}</label>
        <SelectTrigger className="w-full p-2">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          sideOffset={10}
          position="popper"
          avoidCollisions
          className="bg-white outline-0 border"
        >
          {data.map((item, index) => (
            <SelectItem key={index} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </div>
    </Select>
  );
};

export default App_Select;
