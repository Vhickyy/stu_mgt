import App_Full_Text from "@/components/shared/App_Full_Text";
import { Check, Home } from "lucide-react";
import Link from "next/link";

const Dashboard_Classes = () => {
  return (
    <aside className="px-4 pt-4 border w-full bg-white rounded-lg">
      <App_Full_Text
        containerStyle="justify-between flex-row-reverse items-center border-b pb-4"
        text={{
          header: {
            text: "Today's classes",
            type: "dashSub",
          },
        }}
        extra={
          <Link href={"#"} className="text-primary text-xs">
            View Timetable
          </Link>
        }
      />
      <div>
        {[1, 2, 3].map((item, index) => (
          <div
            key={index}
            className={`py-4 flex justify-between items-center ${index != 2 && "border-b"}`}
          >
            <div>
              <div className="bg-primary/30 border rounded-lg p-2">
                <Home size={20} className="text-primary" />
              </div>
              <div></div>
            </div>
            <App_Full_Text
              containerStyle="justify-between flex-row-reverse items-center py-1 px-4 h-fit rounded-lg border bg-primary/30"
              text={{
                para: {
                  text: "Missed",
                  type: "dashText",
                  style: "text-xs font-semibold text-primary",
                },
              }}
              extra={<Check size={10} />}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Dashboard_Classes;
