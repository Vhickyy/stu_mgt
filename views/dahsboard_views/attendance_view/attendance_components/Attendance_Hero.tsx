"use client";
import App_Double_Text from "@/components/shared/App_Double_Text";
import Dashboard_Home_Hero_Card from "../../dashboard_home_view/dashboard_home_components/Dashboard_Home_Hero_Card";
import App_Select from "@/components/app_ui/App_Select";
import { useState } from "react";

const Attendance_Hero = () => {
  const [semester, setSemester] = useState("First Semester");
  return (
    <>
      <App_Double_Text
        textContentStyle="gap-y-1"
        header={{
          text: "Attendance",
          type: "dashTitle",
          style: "text-lg",
        }}
        para={{
          text: "Serving clients acrosshhhh",
          type: "dashText",
          style: "text-base",
        }}
      />

      <div className="flex gap-4 bg-white p-4 mt-4 w-[50%] rounded-lg overflow-hidden">
        <App_Select
          data={[
            { label: "First Semester", key: "First Semester" },
            { label: "Second Semester", key: "Second Semester" },
          ]}
          onChange={setSemester}
          placeholder="Select Status"
          value={semester}
          style="flex-1"
        />
        <App_Select
          data={[
            { label: "First Semester", key: "First Semester" },
            { label: "Second Semester", key: "Second Semester" },
          ]}
          onChange={setSemester}
          placeholder="Select Status"
          value={semester}
          style="flex-1"
        />
      </div>
      <div className="flex gap-4 mt-4">
        {[1, 2, 3, 4].map((item, index) => (
          <Dashboard_Home_Hero_Card key={index} />
        ))}
      </div>
    </>
  );
};

export default Attendance_Hero;
