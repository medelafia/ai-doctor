export default function LoadingComponants() {
  return (
    <div className="flex items-center justify-center py-8 flex-col">
      {/* Spinner */}
      <div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <h6 className="mt-3 text-gray-600 font-medium">Finding result now</h6>
    </div>
  );
}