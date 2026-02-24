import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  firstName: string;
  avatarUrl?: string | null;
}

export const DashboardHeader = ({ firstName, avatarUrl }: Props) => {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <header className="border-b border-primary/10 bg-surface-dark px-6 md:px-10 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-xl md:text-2xl font-heading font-bold">
          Bonjour <span className="gradient-text">{firstName}</span> 👋
        </h1>
        <p className="text-sm text-surface-dark-foreground/40 capitalize">{today}</p>
      </div>
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarUrl ?? undefined} />
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {firstName?.[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
    </header>
  );
};
