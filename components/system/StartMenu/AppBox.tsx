import FileManager from "@/components/system/FileManager";

const AppBox: React.FC = () => (
  <div className="mt-6 flex flex-col justify-start w-[90%] h-full items-start">
    <h3 className="text-white ml-4">All Apps</h3>
    <FileManager
      url="/Users/Public/Start Menu"
      view="start"
      hideLoading
      scrollable={false}
    />
  </div>
);

export default AppBox;
