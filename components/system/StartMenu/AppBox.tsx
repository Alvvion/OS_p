import FileManager from "@/components/system/FileManager";

const AppBox = () => (
  <div className="mt-6 flex flex-col justify-start w-[90%]">
    <h3 className="text-white ml-4">All Apps</h3>
    <FileManager url="/start" view="start" />
  </div>
);

export default AppBox;
