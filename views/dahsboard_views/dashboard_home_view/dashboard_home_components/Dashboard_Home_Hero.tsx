import App_Double_Text from "@/components/shared/App_Double_Text";
import Dashboard_Home_Hero_Card from "./Dashboard_Home_Hero_Card";

const Dashboard_Home_Hero = () => {
  return (
    <>
      <App_Double_Text
        textContentStyle="gap-y-1 "
        header={{
          text: "Hello VEE",
          type: "dashTitle",
          style: "text-lg",
        }}
        para={{
          text: "Serving clients acrosshhhh",
          type: "dashText",
          style: "text-base",
        }}
      />
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((item, index) => (
          <Dashboard_Home_Hero_Card key={index} />
        ))}
      </div>
    </>
  );
};

export default Dashboard_Home_Hero;
