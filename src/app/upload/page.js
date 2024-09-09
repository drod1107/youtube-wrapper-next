// src/app/upload/page.js

import UploadForm from '../../components/UploadForm';

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Video</h1>
      <UploadForm />
    </div>
  );
}