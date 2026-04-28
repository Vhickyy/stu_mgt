import App_Full_Text from "@/components/shared/App_Full_Text";
import App_Table from "@/components/shared/App_Table";
import Link from "next/link";
import {
  result_col,
  result_data,
} from "../../shared/dashboard_data/Result_Column";

const Dashboard_Results = () => {
  return (
    <aside className="p-4 pb-0 border bg-white rounded-lg">
      <App_Full_Text
        containerStyle="justify-between flex-row-reverse items-center"
        text={{
          header: {
            text: "Results",
            type: "dashSub",
          },
        }}
        extra={
          <Link href={"#"} className="text-primary text-xs">
            View Results
          </Link>
        }
      />
      <App_Table columns={result_col} data={result_data} />
    </aside>
  );
};

export default Dashboard_Results;
