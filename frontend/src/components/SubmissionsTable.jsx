import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubmissionsTable = ({ token, assignmentId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/assignments/${assignmentId}/submissions/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubmissions(response.data);
      } catch (err) {
        setError('❌ Failed to fetch submissions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [assignmentId, token]);

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student ID</th>
              <th className="border p-2">Content</th>
              <th className="border p-2">File</th>
              <th className="border p-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="border p-2">{submission.student_id}</td>
                <td className="border p-2">{submission.content}</td>
                <td className="border p-2">
                  {submission.file_url ? (
                    <a
                      href={`http://localhost:8000/${submission.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="border p-2">
                  {new Date(submission.submitted_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubmissionsTable;
