import { ME } from "@/assets/images";
import App_Text from "@/app/_components/app_ui/App_Text";
import App_Double_Text from "@/app/_components/shared/App_Double_Text";
import Image from "next/image";

const Profile_View = () => {
  return (
    <section className="bg-white p-6 max-w-2xl rounded-xl">
      <App_Text text="Profile Information" type="dashSub" />
      <div className="flex gap-10 mt-8">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-primary mt-8">
          <Image
            src={ME}
            alt="me"
            width={100}
            height={100}
            className="w-full"
          />
        </div>
        <div className="flex-1 grid gap-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <App_Double_Text
              key={item}
              textContentStyle="grid grid-cols-2"
              header={{ text: "Full Name", type: "dashText" }}
              para={{ text: "Victoria Okonnah", type: "dashText" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile_View;
