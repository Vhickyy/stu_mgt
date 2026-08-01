import App_Text from "@/app/_components/app_ui/App_Text";
import App_Full_Text from "@/app/_components/shared/App_Full_Text";
import { Home } from "lucide-react";

const Account_Settings_View = () => {
  return (
    <section className="bg-white p-6 max-w-xl rounded-xl">
      <App_Text text="Account Settings" type="dashSub" />
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex justify-between items-center">
          <App_Full_Text
            containerStyle="items-center"
            text={{
              header: {
                text: "Notification",
                type: "dashText",
                style: "font-semibold",
              },
              para: { text: "Some thing", type: "dashText" },
              textContentStyle: "gap-y-.5",
            }}
            extra={<Home />}
          />
        </div>
        <App_Full_Text
          containerStyle="items-center"
          text={{
            header: {
              text: "Notification",
              type: "dashText",
              style: "font-semibold",
            },
            para: { text: "Some thing", type: "dashText" },
            textContentStyle: "gap-y-0",
          }}
          extra={<Home />}
        />
      </div>
    </section>
  );
};

export default Account_Settings_View;
