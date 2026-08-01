"use client";
import App_Switch from "@/app/_components/app_ui/App_Switch";
import App_Text from "@/app/_components/app_ui/App_Text";
import App_Full_Text from "@/app/_components/shared/App_Full_Text";
import { Home } from "lucide-react";
import { useState } from "react";

const Preference_View = () => {
  const [notification, setNotification] = useState(false);
  return (
    <section className="bg-white p-6 max-w-xl rounded-xl">
      <App_Text text="Preferences" type="dashSub" />
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
          <App_Switch setVal={setNotification} val={notification} />
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

export default Preference_View;
