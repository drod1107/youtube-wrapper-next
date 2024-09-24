// src/components/UploadForm.js
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (!file || !title || !description) {
      alert('Please fill out all required fields.');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    // Add user metadata
    formData.append('email', user.primaryEmailAddress.emailAddress);
    formData.append('first_name', user.firstName);
    formData.append('last_name', user.lastName);
    formData.append('org_name', user.publicMetadata.org_name);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Video uploaded successfully! Video ID: ${data.videoId}`);
        // Reset form
        setFile(null);
        setTitle('');
        setDescription('');
        setTags('');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('An error occurred during the video upload.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="file" className="block mb-2">Video File</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="video/*"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="title" className="block mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-2">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <div>
        <label htmlFor="tags" className="block mb-2">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={isUploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}