"use client";
import { Calendar } from "@/app/_components/ui/calendar";
import { ArrowLeft, ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Course_Attendance_Detail_View = () => {
  const attended = [new Date(2026, 0, 12), new Date(2026, 0, 15)];
  const missed = [new Date(2026, 0, 18)];

  return (
    <>
      <Link
        href={"/attendance"}
        className="text-sm text-primary font-semibold flex items-center gap-2 pb-12"
      >
        <ArrowLeftCircleIcon size={20} />
        Back
      </Link>
      <Calendar
        mode="single"
        modifiers={{
          attended,
          missed,
        }}
        modifiersClassNames={{
          attended: "bg-green-500 text-white rounded-full",
          missed: "bg-red-500 text-white rounded-full",
        }}
        className="rounded-md border w-[40%] bg-white"
      />
    </>
  );
};

export default Course_Attendance_Detail_View;
