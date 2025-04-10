import CreateOrganizationForm from "@features/user/components/create-organization-form";

const CreateOrganizationPage = () => {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <CreateOrganizationForm />
        </div>
      </div>
    </div>
  );
};

export default CreateOrganizationPage;
