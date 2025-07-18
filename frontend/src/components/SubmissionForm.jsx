import React, { useState } from 'react';
import axios from 'axios';

const SubmissionForm = ({ token, assignmentId }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('content', content);
    if (file) formData.append('file', file);

    try {
      const response = await axios.post(
        `http://localhost:8000/assignments/${assignmentId}/submit/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('✅ Submission successful!');
      setContent('');
      setFile(null);
    } catch (error) {
      setMessage('❌ Submission failed.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Your answer..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default SubmissionForm;
