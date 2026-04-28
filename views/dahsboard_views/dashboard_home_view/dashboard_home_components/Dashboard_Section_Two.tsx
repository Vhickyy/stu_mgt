import Dashboard_Classes from "./Dashboard_Classes";
import Dashboard_Results from "./Dashboard_Results";
import Dashboard_Recent_Result_And_Quick from "./Dashboard_Recent_Result_And_Quick";

const Dashboard_Section_Two = () => {
  return (
    <section className="flex gap-4 mt-8 ">
      <div className="flex-1 flex flex-col gap-8">
        <Dashboard_Classes />
        <Dashboard_Results />
      </div>
      <div className="flex-1 flex flex-col gap-8 ">
        <div className="flex-1 p-4 border bg-white rounded-lg"></div>
        <Dashboard_Recent_Result_And_Quick />
      </div>
    </section>
  );
};

export default Dashboard_Section_Two;
