export default function EmptyChatState() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#1F2937] rounded-md">
      <div className="text-center max-w-sm">
        <div className="mb-4 text-muted-foreground">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h8m-8 4h4m8 2a2 2 0 01-2 2H6l-4 4V6a2 2 0 012-2h14a2 2 0 012 2v10z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold">Select a conversation</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a room from the left to start chatting.
        </p>
      </div>
    </div>
  );
}
