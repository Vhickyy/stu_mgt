export interface IAttendanceClasses {
  course: {
    code: string;
    title: string;
  };
  present: number;
  absent: number;
  total: number;
  attendance: number;
}
