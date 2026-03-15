import { ReactNode } from "react";

export default function AccordionHeader({
  title,
  subtitle,
  itemCount,
  icon,
}: {
  title: string;
  subtitle: string;
  itemCount?: number;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
