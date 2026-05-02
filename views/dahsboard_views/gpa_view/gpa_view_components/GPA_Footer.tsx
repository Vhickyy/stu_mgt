import App_Full_Text from "@/components/shared/App_Full_Text";
import { grade_color_map, grade_scale } from "../gpa_data/gpa_data";
import App_Text from "@/components/app_ui/App_Text";

const GPA_Footer = () => {
  return (
    <section className="bg-white mt-8 rounded-xl p-4">
      <App_Text text="Grade Scale" type="dashSub" />
      <div className="flex justify-between">
        {grade_scale.map((item) => (
          <App_Full_Text
            key={item.letter}
            containerStyle="rounded-xl px-3 py-1 items-center bg-white shadow-lg p-4"
            text={{
              textContentStyle: "flex-col-reverse gap-y-0",
              header: {
                text: item.label,
                type: "dashText",
              },
              para: {
                text: `${item.min} - ${item.max}`,
                type: "dashText",
              },
            }}
            extra={
              <div
                className={`${grade_color_map[item.color]} flex rounded-xl justify-center items-center w-12 h-12`}
              >
                <App_Text text={item.letter} type="dashSub" />
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default GPA_Footer;
