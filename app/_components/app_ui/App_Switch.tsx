import { Switch } from "../ui/switch";

const App_Switch = ({
  val,
  setVal,
}: {
  val: boolean;
  setVal: (val: boolean) => void;
}) => {
  return (
    <Switch
      className="data-unchecked:bg-gray-400"
      checked={val}
      onCheckedChange={(val) => setVal(val)}
    />
  );
};

export default App_Switch;
