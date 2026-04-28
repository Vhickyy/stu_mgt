import { IFullText } from "@/types";
// import App_Button from "../app_ui/App_Button";
import App_Double_Text from "./App_Double_Text";
import { cn } from "@/lib/utils";

const App_Full_Text = ({ containerStyle, btn, text, extra }: IFullText) => {
  return (
    <aside className={cn("flex gap-4", containerStyle)}>
      {extra && extra}
      <App_Double_Text
        header={text.header}
        para={text.para}
        textContentStyle={text.textContentStyle}
      />
      {/* {btn && <App_Button {...btn} />} */}
    </aside>
  );
};

export default App_Full_Text;
