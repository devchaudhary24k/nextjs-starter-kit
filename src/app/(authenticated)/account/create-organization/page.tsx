import CreateOrganizationForm from "@features/user/components/create-organization-form";

/**
 * Create Organization Page - TEMP PAGE
 *
 * This page is temporarily used to create organizations for development purposes.
 *
 * @returns The rendered Create Organization Page.
 */
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
