import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#130B2C]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-6 text-white sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-lg font-normal">Powered by</span>
          <div className="flex items-end gap-1 leading-none">
            <span className="text-[28px] font-bold tracking-tight">AKIJ</span>
            <span className="pb-1 text-sm font-semibold tracking-wide">RESOURCE</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-base">
          <span className="font-medium">Helpline</span>

          <div className="flex items-center gap-2 font-normal">
            <Phone className="size-5" strokeWidth={1.8} />
            <span>+88 011020202505</span>
          </div>

          <div className="flex items-center gap-2 font-normal">
            <Mail className="size-5" strokeWidth={1.8} />
            <span>support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}