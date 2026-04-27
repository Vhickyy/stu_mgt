import App_Text from "@/components/app_ui/App_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";
import App_Table from "@/components/shared/App_Table";
import { Check } from "lucide-react";
import {
  result_col,
  resultle_data,
} from "../../shared/dashboard_data/Result_Column";

const Dashboard_Recent_Result_And_Quick = () => {
  return (
    <div className="flex gap-4">
      {/* Recentile Result */}
      <div className="flex-1 p-4 border bg-white rounded-lg">
        <App_Text text="Recentle Result" type="dashSub" />
        <App_Table
          columns={result_col}
          data={resultle_data}
          childRowStyle="border-0"
        />
      </div>

      {/* Quick Action */}
      <div className="flex-1 p-4 border bg-white rounded-lg">
        <App_Text text="Quick Actions" type="dashSub" />
        <div className="mt-4 flex flex-col gap-2">
          {[1, 2, 3, 4].map((item, index) => (
            <App_Full_Text
              key={index}
              containerStyle="gap-4 items-center p-4 h-fit rounded-lg border"
              text={{
                para: {
                  text: "Missed",
                  type: "dashText",
                  style: "font-semibold",
                },
              }}
              extra={<Check size={20} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Recent_Result_And_Quick;
