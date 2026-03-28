interface CardProps {
  id: string;
  originalUrl: string;
  shortUrl: string;
}

export function ShortenUrlCard({ id, originalUrl, shortUrl }: CardProps) {
    console.log(id, originalUrl, shortUrl)
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500 mb-1">Original URL:</p>
      <p className="text-sm break-all mb-2">{originalUrl}</p>

      <p className="text-sm text-slate-500 mb-1">Short URL:</p>
      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="text-cyan-600 font-medium underline break-all"
      >
        {shortUrl}
      </a>
    </div>
  );
}