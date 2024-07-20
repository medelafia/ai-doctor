export default function LoadingComponants() {
  return (
    <div className="d-flex align-items-center justify-content-center py-5 flex-column">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <h6>finding result now</h6>
    </div>
  );
}
