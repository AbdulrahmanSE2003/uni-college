import LoginForm from "@/features/auth/components/LoginForm";

const Page = () => {
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <section className="hidden lg:flex items-center justify-center bg-primary p-12">
        <div className="max-w-md text-primary-foreground">
          <h1 className="text-5xl font-bold tracking-tight">Uni-College</h1>

          <p className="mt-6 text-lg text-primary-foreground/80 leading-8">
            A modern university management system for students, teachers, and
            administrators.
          </p>
        </div>
      </section>

      {/* Right Side */}
      <section className="flex items-center justify-center bg-background p-6 md:p-10">
        <LoginForm />
      </section>
    </main>
  );
};

export default Page;
