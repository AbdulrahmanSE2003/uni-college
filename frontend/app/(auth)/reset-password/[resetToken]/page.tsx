import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

const page = async ({
  params,
}: {
  params: Promise<{ resetToken: string }>;
}) => {
  const { resetToken } = await params;
  return (
    <section
      className={`bg-brand-secondary text-foreground h-screen flex justify-center items-center`}
    >
      <ResetPasswordForm token={resetToken} />
    </section>
  );
};

export default page;
