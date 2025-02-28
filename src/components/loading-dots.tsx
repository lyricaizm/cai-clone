export function LoadingDots() {
  return (
    <div className="flex space-x-1 h-4 items-center">
      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
    </div>
  );
}
