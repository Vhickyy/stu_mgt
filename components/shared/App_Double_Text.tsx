import { IDoubleText } from "@/types";
import App_Text from "../app_ui/App_Text";
import { cn } from "@/lib/utils";

const App_Double_Text = ({ para, header, textContentStyle }: IDoubleText) => {
  return (
    <aside className={cn("flex flex-col gap-y-2", textContentStyle)}>
      {header && <App_Text {...header} />}
      {para && <App_Text {...para} />}
    </aside>
  );
};

export default App_Double_Text;
