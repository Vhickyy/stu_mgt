import App_Text from "@/app/_components/app_ui/App_Text";

const WelcomeHeader = ({
  name,
  semesterLabel,
}: {
  name: string;
  semesterLabel: string | null;
}) => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <App_Text
          type="dashTitle"
          text={`Welcome back, ${name.split(" ")[0]}`}
        />
        <p className="text-sm text-gray-500 mt-1">{today}</p>
      </div>
      {semesterLabel && (
        <span className="self-start rounded-full bg-primary/10 text-primary text-sm font-medium px-3 py-1.5">
          {semesterLabel}
        </span>
      )}
    </div>
  );
};

export default WelcomeHeader;
