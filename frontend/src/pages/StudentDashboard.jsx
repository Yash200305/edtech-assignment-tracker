import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubmissionForm from '../components/SubmissionForm';

const StudentDashboard = ({ token }) => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/assignments/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssignments(response.data);
      } catch (err) {
        setError('❌ Failed to fetch assignments.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      {loading ? (
        <p>Loading assignments...</p>
      ) : error ? (
        <p>{error}</p>
      ) : assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="p-4 border border-gray-300 rounded shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">{assignment.title}</h2>
              <p>{assignment.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(assignment.due_date).toLocaleString()}
              </p>
              <button
                onClick={() => setSelectedAssignmentId(assignment.id)}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedAssignmentId && (
        <div className="mt-8">
          <SubmissionForm token={token} assignmentId={selectedAssignmentId} />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
