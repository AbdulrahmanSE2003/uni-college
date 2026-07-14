import ChangePasswordForm from "@/features/auth/components/ChangePasswordForm";

const page = () => {
  return (
    <section
      className={`bg-brand-secondary text-foreground h-screen flex justify-center items-center`}
    >
      <ChangePasswordForm />
    </section>
  );
};

export default page;
