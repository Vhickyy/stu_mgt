import App_Table from "@/components/shared/App_Table";
import { results_col, results_data } from "../results_data/Result_Data_Column";
import App_Text from "@/components/app_ui/App_Text";
import { gradeScale } from "../results_data/Result_Data";

const Result_Section_Two = () => {
  return (
    <section className="flex gap-4 mt-8">
      <div className="bg-white p-4 rounded-lg border flex-1">
        <App_Table columns={results_col} data={results_data} />
      </div>
      <div className="bg-white py-4 px-6 rounded-lg border h-fit">
        <p>text</p>
        <div className="flex flex-col gap-2 mt-2">
          {gradeScale.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <App_Text
                text={item.letter}
                type="dashText"
                style="text-xs font-semibold"
              />
              <App_Text
                text={`${item.min} - ${item.max}`}
                type="dashText"
                style="text-xs "
              />
              <App_Text text={item.label} type="dashText" style="text-xs " />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Result_Section_Two;
