import App_Full_Text from "@/components/shared/App_Full_Text";
import App_Table from "@/components/shared/App_Table";
import Link from "next/link";
import {
  attendance_classes_column,
  attendance_classes_data,
} from "../attendance_data/Attendance_Classes_Column";
import { Home } from "lucide-react";

const Attendance_Section_Two = () => {
  return (
    <section className="flex gap-4 mt-8 ">
      <div className="flex-1 p-4 border bg-white rounded-lg">
        <App_Full_Text
          containerStyle="justify-between flex-row-reverse items-center border-b pb-4"
          text={{
            header: {
              text: "Attendance by classes",
              type: "dashSub",
            },
          }}
          extra={
            <Link href={"#"} className="text-primary text-xs">
              View Timetable
            </Link>
          }
        />
        <App_Table
          columns={attendance_classes_column}
          data={attendance_classes_data}
          childRowStyle="border-0"
        />
      </div>
      <div className="flex-1 flex flex-col gap-8 ">
        <div className="flex-1 p-4 border bg-white  rounded-lg"></div>
        <App_Full_Text
          containerStyle="flex-col gap-y-0 bg-primary/30 border p-6 rounded-lg"
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
          extra={<Home className="text-primary " size={20} />}
        />
      </div>
    </section>
  );
};

export default Attendance_Section_Two;
