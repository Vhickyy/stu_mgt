"use client";
import App_Select from "@/components/app_ui/App_Select";
import App_Double_Text from "@/components/shared/App_Double_Text";
import { useState } from "react";

const GPA_Hero = () => {
  const [semester, setSemester] = useState("First Semester");

  return (
    <div className="flex justify-between items-center">
      <App_Double_Text
        textContentStyle="gap-y-1"
        header={{
          text: "GPA",
          type: "dashTitle",
          style: "text-lg",
        }}
        para={{
          text: "Calculate your GPA and CGPA easily",
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
    </div>
  );
};

export default GPA_Hero;
