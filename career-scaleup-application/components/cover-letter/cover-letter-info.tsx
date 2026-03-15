export default function CoverLetterInfo() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-6 text-card-foreground">
      <h2 className="text-xl font-semibold">Cover Letter Generator Guide</h2>

      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-medium">✨ Automatic Mode</h3>
          <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
            <li>Select one of your resumes.</li>
            <li>Select a job from your saved jobs.</li>
            <li>Click "Generate Cover Letter".</li>
          </ol>
          <p className="text-xs text-muted-foreground ml-5">
            This mode automatically uses job title, description, and company
            from the selected job.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-medium">📝 Manual Mode</h3>
          <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
            <li>Select a resume.</li>
            <li>Type the job title manually.</li>
            <li>Enter the company name.</li>
            <li>Paste or write the job description.</li>
            <li>Click "Generate Cover Letter".</li>
          </ol>
          <p className="text-xs text-muted-foreground ml-5">
            Use this mode for external or unlisted jobs.
          </p>
        </div>
      </div>
    </div>
  );
}
