export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="pt-40 pb-16 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}