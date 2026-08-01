import { X } from "lucide-react";
import App_Text from "./App_Text";
import { IApp_Modal } from "@/app/_types";

const App_Modal = ({ children, onClose, text }: IApp_Modal) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          {/* <App_Text
            variant="cardHeading"
            className="text-base"
            children={text}
          /> */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default App_Modal;
