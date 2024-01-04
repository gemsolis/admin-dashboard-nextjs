import ThemeToggle from "@/app/ui/dashboard/settings/ThemeToggle";

const SettingsPage = () => {
  return (
    <div className="global-bg w-full flex flex-col gap-5 my-5  p-5 rounded-md">
      <ThemeToggle />
    </div>
  );
};

export default SettingsPage;
