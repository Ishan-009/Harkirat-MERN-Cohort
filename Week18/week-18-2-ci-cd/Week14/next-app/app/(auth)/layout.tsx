export default function signinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-20">
      <div className="text-3xl flex items-center justify-center font-bold w-full h-[25vh] border-b-2">
        Avail 20% discount offer this week
      </div>
      {children}
    </div>
  );
}
