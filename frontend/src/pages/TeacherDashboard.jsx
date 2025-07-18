import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssignmentForm from '../components/AssignmentForm';
import SubmissionsTable from '../components/SubmissionsTable';

const TeacherDashboard = ({ token }) => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchAssignments();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      <AssignmentForm token={token} />

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Assignments</h2>
      {loading ? (
        <p>Loading assignments...</p>
      ) : error ? (
        <p>{error}</p>
      ) : assignments.length === 0 ? (
        <p>No assignments created yet.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="p-4 border border-gray-300 rounded shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">{assignment.title}</h3>
              <p>{assignment.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(assignment.due_date).toLocaleString()}
              </p>
              <button
                onClick={() => setSelectedAssignmentId(assignment.id)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Submissions
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedAssignmentId && (
        <div className="mt-8">
          <SubmissionsTable token={token} assignmentId={selectedAssignmentId} />
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
