import App_Text from "@/components/app_ui/App_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";
import { Home } from "lucide-react";

const Dashboard_Home_Hero_Card = () => {
  return (
    <div className="bg-white rounded-lg border p-4 flex flex-col flex-1 gap-4">
      <div className="flex gap-4 flex-1">
        <div className="bg-primary/30 rounded-full h-fit p-2">
          <Home className="text-primary " size={20} />
        </div>
        <App_Full_Text
          containerStyle="flex-1 flex-col gap-y-0"
          text={{
            textContentStyle: "gap-y-0",
            header: {
              text: "4.21",
              type: "dashSub",
              style: "uppercase",
            },
            para: {
              text: "good",
              type: "dashText",
            },
          }}
          extra={<App_Text type="dashText" text="GPA" style="font-semibold" />}
        />
        <div className="bg-primary/30 rounded-full h-fit p-2">
          <Home className="text-primary" size={20} />
        </div>
      </div>
      <p>Graph</p>
    </div>
  );
};

export default Dashboard_Home_Hero_Card;
