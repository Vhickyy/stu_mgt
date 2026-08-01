import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IAppInput } from "@/app/_types";
import { Label } from "../ui/label";

const App_Input = <T extends Record<string, any>>({
  errors,
  register,
  name,
  rules,
  className,
  placeholder,
  containerStyle,
  icon1,
  icon2,
  showLabel = true,
  basic = false,
  onChange,
}: IAppInput<T>) => {
  return (
    <div className={`${cn(containerStyle)}`}>
      {showLabel && (
        <Label htmlFor={String(name)} className="mb-2">
          {String(name)}
        </Label>
      )}
      <div className="flex justify-center items-center gap-2 border-gray-400 bg-white outline-0 border rounded-lg">
        <div className="flex flex-1 justify-center  items-center gap-2 px-2">
          {icon1 && icon1}
          {basic ? (
            <Input
              placeholder={placeholder ?? String(name)}
              className={cn(
                "h-10 border-0 px-0 outline-none ring-0 shadow-none focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none",
                className,
              )}
              name={name}
              onChange={onChange}
            />
          ) : (
            <Input
              placeholder={placeholder ?? String(name)}
              className={cn(
                "h-10 border-0 px-0 outline-none ring-0 shadow-none focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none",
                className,
              )}
              {...(register && { ...register(name, rules) })}
            />
          )}
        </div>
        {icon2 && icon2}
      </div>
      {errors && errors[name] && (
        <p className="text-sm text-destructive mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default App_Input;
