import App_Table from "@/app/_components/shared/App_Table";
import App_Text from "@/app/_components/app_ui/App_Text";
import {
  results_col,
  results_data,
} from "../../results_view/results_data/Result_Data_Column";
import App_Double_Text from "@/app/_components/shared/App_Double_Text";

const GPA_Main = () => {
  return (
    <section className="flex gap-4 mt-8">
      <div className="bg-white p-4 rounded-lg border flex-1">
        <App_Table columns={results_col} data={results_data} />
      </div>
      <div className="w-[30%] flex-col flex gap-4">
        <div className="bg-white py-4 px-6 rounded-lg border flex-1">
          <p>text</p>
          <div className="flex justify-between gap-2 mt-2 ">
            <App_Double_Text
              textContentStyle="gap-y-1 flex-col-reverse flex-1 items-center"
              header={{
                text: "17",
                type: "dashTitle",
                style: "text-lg",
              }}
              para={{
                text: "Total Units",
                type: "dashText",
                style: "text-sm",
              }}
            />
            <App_Double_Text
              textContentStyle="gap-y-1 flex-col-reverse flex-1 items-center"
              header={{
                text: "17",
                type: "dashTitle",
                style: "text-lg",
              }}
              para={{
                text: "Total Units",
                type: "dashText",
                style: "text-sm",
              }}
            />
          </div>
          <App_Double_Text
            textContentStyle="gap-y-1 flex-col-reverse flex-1 items-center mt-8"
            header={{
              text: "17",
              type: "dashTitle",
              style: "text-lg",
            }}
            para={{
              text: "Total Units",
              type: "dashText",
              style: "text-sm",
            }}
          />
        </div>
        <div className="rounded-lg border overflow-hidden">
          <div className="bg-white py-4 px-6 flex-1">
            <App_Double_Text
              textContentStyle="gap-y-1 flex-col-reverse flex-1 items-center mt-8"
              header={{
                text: "17",
                type: "dashTitle",
                style: "text-lg",
              }}
              para={{
                text: "Total Units",
                type: "dashText",
                style: "text-sm",
              }}
            />
          </div>
          <div className="bg-primary/30 py-4">
            <App_Text
              text="Keep it up, GoodLuck! 🎉"
              type="dashText"
              style="text-center font-semibold"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GPA_Main;
